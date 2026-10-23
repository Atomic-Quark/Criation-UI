import type {
  ApplicationModel,
  ResourceDefinition,
  FieldDefinition,
  PageDefinition,
  ViewDefinition,
  ActionDefinition,
} from "../engine/model";

/**
 * Parses Mode B Structured DSL into an ApplicationModel.
 * 
 * Example:
 * page "Members"
 *   path "/members"
 *   title "Member Management"
 * 
 * resource "Member"
 *   endpoint "/api/members"
 *   field "name" as text required
 *   field "email" as email required
 *   field "role" as select options ["Admin", "Developer", "Designer"]
 * 
 * table "Member"
 *   searchable
 * 
 * action "create" for "Member"
 * action "delete" for "Member"
 */
export function parseStructuredDSL(dslText: string): ApplicationModel {
  const lines = dslText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith("//"));

  const resources: Record<string, ResourceDefinition> = {};
  const pages: PageDefinition[] = [];

  let currentResource: ResourceDefinition | null = null;
  let currentPage: PageDefinition | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Resource start
    const resMatch = line.match(/^resource\s+["']?([^"']+)["']?/i);
    if (resMatch) {
      const name = resMatch[1].trim();
      currentResource = {
        name,
        singular: name,
        plural: name.endsWith("s") ? name : `${name}s`,
        endpoint: `/api/${name.toLowerCase()}s`,
        fields: [],
        searchableFields: [],
      };
      resources[name] = currentResource;
      continue;
    }

    // Endpoint under resource
    const epMatch = line.match(/^endpoint\s+["']?([^"']+)["']?/i);
    if (epMatch && currentResource) {
      currentResource.endpoint = epMatch[1].trim();
      continue;
    }

    // Field under resource: field "name" as text required
    const fieldMatch = line.match(
      /^field\s+["']?([^"'\s]+)["']?\s+as\s+([a-zA-Z]+)(.*)$/i
    );
    if (fieldMatch && currentResource) {
      const fieldName = fieldMatch[1].trim();
      const rawType = fieldMatch[2].toLowerCase();
      const rest = fieldMatch[3].trim();

      const type =
        rawType === "text" || rawType === "string"
          ? "string"
          : rawType === "email"
          ? "email"
          : rawType === "number"
          ? "number"
          : rawType === "select"
          ? "select"
          : rawType === "textarea"
          ? "textarea"
          : "string";

      const isRequired = /required/i.test(rest);

      let options: string[] | undefined;
      const optMatch = rest.match(/options\s+\[(.*?)\]/i);
      if (optMatch) {
        options = optMatch[1]
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      }

      const fieldDef: FieldDefinition = {
        name: fieldName,
        label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
        type,
        options,
        validation: isRequired ? { required: true } : undefined,
      };

      currentResource.fields.push(fieldDef);
      if (type === "string" || type === "email") {
        currentResource.searchableFields?.push(fieldName);
      }
      continue;
    }

    // Page declaration
    const pageMatch = line.match(/^page\s+["']?([^"']+)["']?/i);
    if (pageMatch) {
      const pageName = pageMatch[1].trim();
      currentPage = {
        id: `page-${pageName.toLowerCase()}`,
        name: pageName,
        title: pageName,
        path: `/${pageName.toLowerCase()}`,
        views: [],
        actions: [],
      };
      pages.push(currentPage);
      continue;
    }

    // Table view: table "Member" searchable
    const tableMatch = line.match(/^table\s+["']?([^"'\s]+)["']?(.*)$/i);
    if (tableMatch) {
      const targetRes = tableMatch[1].trim();
      const rest = tableMatch[2].trim();
      const isSearchable = /searchable/i.test(rest) || true;

      const view: ViewDefinition = {
        id: `view-table-${targetRes.toLowerCase()}`,
        title: `${targetRes} Table`,
        type: "table",
        resourceName: targetRes,
        searchable: isSearchable,
        paginated: true,
      };

      if (currentPage) {
        currentPage.views.push(view);
      }
      continue;
    }

    // Action: action "create" for "Member"
    const actionMatch = line.match(/^action\s+["']?([^"'\s]+)["']?\s+(?:for\s+["']?([^"'\s]+)["']?)?(.*)$/i);
    if (actionMatch) {
      const actionType = actionMatch[1].toLowerCase() as any;
      const targetRes = actionMatch[2]?.trim() || Object.keys(resources)[0] || "Item";
      const rest = actionMatch[3]?.trim() || "";

      const action: ActionDefinition = {
        id: `action-${actionType}-${targetRes.toLowerCase()}`,
        name: actionType,
        label: actionType === "create" ? `Add ${targetRes}` : actionType === "delete" ? `Delete ${targetRes}` : actionType,
        type: actionType,
        targetResource: targetRes,
        requiresConfirmation: /confirm/i.test(rest) || actionType === "delete",
      };

      if (currentPage) {
        currentPage.actions.push(action);
      }
      continue;
    }
  }

  // Ensure default page exists if none was explicitly declared
  if (pages.length === 0 && Object.keys(resources).length > 0) {
    const firstRes = Object.values(resources)[0];
    pages.push({
      id: `page-${firstRes.plural.toLowerCase()}`,
      name: firstRes.plural,
      title: `${firstRes.plural} Management`,
      path: `/${firstRes.plural.toLowerCase()}`,
      views: [
        {
          id: `view-table-${firstRes.name.toLowerCase()}`,
          title: `${firstRes.plural} Table`,
          type: "table",
          resourceName: firstRes.name,
          searchable: true,
          paginated: true,
        },
      ],
      actions: [
        {
          id: `action-create-${firstRes.name.toLowerCase()}`,
          name: "create",
          label: `Add ${firstRes.singular}`,
          type: "create",
          targetResource: firstRes.name,
        },
        {
          id: `action-delete-${firstRes.name.toLowerCase()}`,
          name: "delete",
          label: `Delete ${firstRes.singular}`,
          type: "delete",
          targetResource: firstRes.name,
          requiresConfirmation: true,
        },
      ],
    });
  }

  return {
    name: "GeneratedApp",
    title: pages[0]?.title || "Criation Application",
    resources,
    pages,
    api: {
      baseUrl: "",
      resources: Object.fromEntries(
        Object.entries(resources).map(([k, v]) => [k, v.endpoint])
      ),
      mockStorageFallback: true,
    },
  };
}
