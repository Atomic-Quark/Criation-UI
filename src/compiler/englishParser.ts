import type {
  ApplicationModel,
  ResourceDefinition,
  FieldDefinition,
  PageDefinition,
  ViewDefinition,
  ActionDefinition,
} from "../engine/model";

/**
 * Parses Mode A Plain-English descriptions into a structured ApplicationModel.
 * 
 * Supports descriptions such as:
 * "Create a page called Members.
 * Show all members in a searchable table.
 * Add a button called Add Member.
 * When clicked, open a form with Name, Email, and Role.
 * Require all fields and validate the email.
 * When the form is submitted, save the member using the Members API.
 * Show a confirmation dialog before deleting a member."
 */
export function parseEnglishDescription(englishText: string): ApplicationModel {
  const text = englishText.trim();
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // 1. Identify Page Name
  let pageName = "Dashboard";
  const pageMatch = text.match(/(?:create\s+(?:a\s+)?page\s+called|page\s+called|dashboard\s+for\s+(?:a\s+)?)\s*["']?([a-zA-Z0-9\s_-]+?)["']?(?:\.|\n|$)/i);
  if (pageMatch) {
    pageName = pageMatch[1].trim();
  }

  // 2. Identify Resource / Entity Name
  let entitySingular = "Item";
  let entityPlural = "Items";

  const entityMatch =
    text.match(/(?:show\s+all|list\s+all|manage)\s+([a-zA-Z0-9_-]+)/i) ||
    text.match(/(?:save\s+(?:the\s+)?|deleting\s+(?:a\s+)?)([a-zA-Z0-9_-]+)/i) ||
    text.match(/(?:page\s+called|create\s+resource)\s+["']?([a-zA-Z0-9_-]+)["']?/i);

  if (entityMatch) {
    const rawEntity = entityMatch[1].trim();
    if (rawEntity.toLowerCase().endsWith("s")) {
      entityPlural = rawEntity.charAt(0).toUpperCase() + rawEntity.slice(1);
      entitySingular = entityPlural.slice(0, -1);
    } else {
      entitySingular = rawEntity.charAt(0).toUpperCase() + rawEntity.slice(1);
      entityPlural = `${entitySingular}s`;
    }
  }

  // 3. Extract Form Fields
  const fields: FieldDefinition[] = [];
  const formFieldMatch = text.match(/(?:form\s+with|fields?:?|ask\s+for:?)\s+([^.\n]+)/i);

  if (formFieldMatch) {
    const fieldListRaw = formFieldMatch[1];
    // Split on commas or "and"
    const rawTokens = fieldListRaw
      .replace(/\band\b/gi, ",")
      .split(",")
      .map((t) => t.trim().replace(/^["']|["']$/g, ""))
      .filter((t) => t.length > 0 && !/^(?:all|both|fields|with)$/i.test(t));

    for (const token of rawTokens) {
      const cleanName = token.replace(/[^a-zA-Z0-9_]/g, "");
      if (!cleanName) continue;

      const lower = cleanName.toLowerCase();
      let type: FieldDefinition["type"] = "string";
      let options: string[] | undefined;

      if (lower.includes("email")) {
        type = "email";
      } else if (lower.includes("age") || lower.includes("price") || lower.includes("count") || lower.includes("number")) {
        type = "number";
      } else if (lower.includes("role")) {
        type = "select";
        options = ["Admin", "Manager", "Member", "Viewer"];
      } else if (lower.includes("status")) {
        type = "select";
        options = ["Active", "Pending", "Inactive"];
      } else if (lower.includes("date")) {
        type = "date";
      } else if (lower.includes("description") || lower.includes("bio") || lower.includes("note")) {
        type = "textarea";
      }

      fields.push({
        name: cleanName.toLowerCase(),
        label: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
        type,
        options,
        validation: { required: true }, // Default required if mentioned in prompt
      });
    }
  }

  // Fallback default fields if none extracted
  if (fields.length === 0) {
    fields.push(
      { name: "name", label: "Name", type: "string", validation: { required: true } },
      { name: "email", label: "Email Address", type: "email", validation: { required: true } },
      { name: "role", label: "Role", type: "select", options: ["Admin", "Member", "Guest"] }
    );
  }

  // Check validation rules in text
  const requiresEmailValidation = /validate\s+(?:the\s+)?email/i.test(text);
  const requireAll = /require\s+(?:all|both)\s+fields/i.test(text);

  for (const f of fields) {
    if (requireAll) {
      f.validation = { ...f.validation, required: true };
    }
    if (f.type === "email" && requiresEmailValidation) {
      f.validation = { ...f.validation, required: true };
    }
  }

  // 4. Construct Resource Definition
  const resource: ResourceDefinition = {
    name: entitySingular,
    singular: entitySingular,
    plural: entityPlural,
    endpoint: `/api/${entityPlural.toLowerCase()}`,
    fields,
    searchableFields: fields.filter((f) => f.type === "string" || f.type === "email").map((f) => f.name),
  };

  // 5. Views
  const isSearchable = /searchable|search/i.test(text);
  const isPaginated = /paginated|pagination|pages/i.test(text);

  const view: ViewDefinition = {
    id: `view-table-${entityPlural.toLowerCase()}`,
    title: `${entityPlural} Table`,
    type: "table",
    resourceName: entitySingular,
    searchable: isSearchable,
    paginated: isPaginated,
    pageSize: 10,
  };

  // 6. Actions
  const actions: ActionDefinition[] = [
    {
      id: `action-create-${entitySingular.toLowerCase()}`,
      name: "create",
      label: `Add ${entitySingular}`,
      type: "create",
      targetResource: entitySingular,
      dialogTitle: `New ${entitySingular}`,
    },
    {
      id: `action-edit-${entitySingular.toLowerCase()}`,
      name: "edit",
      label: `Edit ${entitySingular}`,
      type: "edit",
      targetResource: entitySingular,
      dialogTitle: `Edit ${entitySingular}`,
    },
    {
      id: `action-delete-${entitySingular.toLowerCase()}`,
      name: "delete",
      label: `Delete ${entitySingular}`,
      type: "delete",
      targetResource: entitySingular,
      requiresConfirmation: /confirm/i.test(text) || true,
      confirmMessage: `Are you sure you want to delete this ${entitySingular.toLowerCase()}?`,
    },
  ];

  // 7. Page Definition
  const page: PageDefinition = {
    id: `page-${pageName.toLowerCase().replace(/\s+/g, "-")}`,
    name: pageName,
    title: `${pageName}`,
    path: `/${pageName.toLowerCase().replace(/\s+/g, "-")}`,
    views: [view],
    actions,
  };

  return {
    name: `${pageName.replace(/\s+/g, "")}App`,
    title: `${pageName} System`,
    description: `Generated from plain-English description: "${sentences[0] || text.slice(0, 60)}"`,
    resources: {
      [entitySingular]: resource,
    },
    pages: [page],
    api: {
      baseUrl: "",
      resources: {
        [entitySingular]: resource.endpoint,
      },
      mockStorageFallback: true,
    },
  };
}
