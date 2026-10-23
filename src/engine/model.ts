/**
 * Criation UI — Core Application Model (AST / Intermediate Representation)
 * 
 * Defines the unified, serializable Application Model used across:
 * - Mode A: Plain-English Natural Language Parser
 * - Mode B: Structured DSL Parser
 * - Mode C: Advanced Programmatic React Engine
 * - Deterministic React Code Generator
 */

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "email"
  | "select"
  | "date"
  | "textarea";

export interface FieldValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customMessage?: string;
}

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  options?: string[] | { label: string; value: string }[];
  validation?: FieldValidationRule;
  readOnly?: boolean;
  hidden?: boolean;
}

export interface ResourceDefinition {
  name: string;
  singular: string;
  plural: string;
  endpoint: string;
  primaryKey?: string;
  fields: FieldDefinition[];
  searchableFields?: string[];
  sortableFields?: string[];
  defaultSort?: { field: string; direction: "asc" | "desc" };
}

export type ViewType = "table" | "cards" | "detail" | "form";

export interface ViewDefinition {
  id: string;
  title: string;
  type: ViewType;
  resourceName: string;
  visibleFields?: string[];
  searchable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  sortable?: boolean;
}

export type ActionType = "create" | "edit" | "delete" | "view" | "custom";

export interface ActionDefinition {
  id: string;
  name: string;
  label: string;
  type: ActionType;
  targetResource: string;
  dialogTitle?: string;
  confirmMessage?: string;
  successMessage?: string;
  requiresConfirmation?: boolean;
}

export interface PageDefinition {
  id: string;
  name: string;
  title: string;
  path: string;
  views: ViewDefinition[];
  actions: ActionDefinition[];
}

export interface ApiDefinition {
  baseUrl: string;
  resources: Record<string, string>; // resourceName -> endpoint
  mockStorageFallback?: boolean;
  timeoutMs?: number;
}

export interface ApplicationModel {
  name: string;
  title: string;
  description?: string;
  version?: string;
  resources: Record<string, ResourceDefinition>;
  pages: PageDefinition[];
  api: ApiDefinition;
}

/**
 * Validates an Application Model for structural completeness and consistency.
 * Returns a list of error messages (empty array if valid).
 */
export function validateApplicationModel(model: ApplicationModel): string[] {
  const errors: string[] = [];

  if (!model.name || typeof model.name !== "string") {
    errors.push("ApplicationModel must have a valid 'name' string.");
  }

  if (!model.resources || Object.keys(model.resources).length === 0) {
    errors.push("ApplicationModel must define at least one Resource.");
  }

  for (const [resKey, resource] of Object.entries(model.resources || {})) {
    if (!resource.name) {
      errors.push(`Resource '${resKey}' is missing a name.`);
    }
    if (!resource.fields || resource.fields.length === 0) {
      errors.push(`Resource '${resource.name || resKey}' must have at least one field.`);
    } else {
      for (const field of resource.fields) {
        if (!field.name) {
          errors.push(`Resource '${resource.name}' contains a field missing a 'name'.`);
        }
        if (!field.type) {
          errors.push(`Field '${field.name}' in Resource '${resource.name}' is missing a 'type'.`);
        }
      }
    }
  }

  for (const page of model.pages || []) {
    if (!page.name) {
      errors.push("A Page definition is missing a 'name'.");
    }
    for (const view of page.views || []) {
      if (!model.resources[view.resourceName]) {
        errors.push(`View '${view.title || view.id}' references unknown resource '${view.resourceName}'.`);
      }
    }
    for (const action of page.actions || []) {
      if (action.targetResource && !model.resources[action.targetResource]) {
        errors.push(`Action '${action.name}' references unknown target resource '${action.targetResource}'.`);
      }
    }
  }

  return errors;
}
