import React, { useState, useEffect, useCallback } from "react";
import type { ResourceDefinition } from "./model";
import { createResourceApi, type ResourceApi } from "./api";
import { SchemaForm } from "./forms";
import { Modal } from "../components/overlays/Modal";
import { BaseButton } from "../components/buttons/Button";
import { BaseInput } from "../components/inputs/Input";
import { BaseCard } from "../components/data-display/Card";
import { BaseStack } from "../components/layout/Stack";
import { Heading } from "../components/typography/Heading";
import { Text } from "../components/typography/Text";
import { Spinner } from "../components/feedback/Spinner";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

export function defineResource(def: ResourceDefinition): ResourceDefinition {
  return def;
}

export interface ResourceTableProps<T extends { id: string | number; [key: string]: any } = any> {
  resource: ResourceDefinition;
  api?: ResourceApi<T>;
  items?: T[];
  isLoading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  searchable?: boolean;
  onRefresh?: () => void;
}

export function ResourceTable<T extends { id: string | number; [key: string]: any }>({
  resource,
  api,
  items: controlledItems,
  isLoading: controlledLoading,
  onEdit,
  onDelete,
  searchable = true,
  onRefresh,
}: ResourceTableProps<T>) {
  const [internalItems, setInternalItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean(api && controlledItems === undefined));
  const [search, setSearch] = useState("");

  const items = controlledItems !== undefined ? controlledItems : internalItems;
  const isTableLoading = controlledLoading !== undefined ? controlledLoading : loading;

  const loadData = useCallback(async (query = "") => {
    if (!api) return;
    setLoading(true);
    try {
      const data = await api.list({ search: query });
      setInternalItems(data);
    } catch (err) {
      console.error(`Failed to load items for ${resource.name}:`, err);
    } finally {
      setLoading(false);
    }
  }, [api, resource.name]);

  useEffect(() => {
    if (controlledItems === undefined && api) {
      loadData(search);
    }
  }, [api, search, controlledItems, loadData]);

  const displayFields = resource.fields.filter((f) => !f.hidden);

  return (
    <BaseCard variant="outline" padding="md" style={{ overflow: "hidden" }}>
      {searchable && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ position: "relative", width: 320 }}>
            <BaseInput
              placeholder={`Search ${resource.plural.toLowerCase()}...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (api && controlledItems === undefined) {
                  loadData(e.target.value);
                }
              }}
              leftIcon={<Search size={16} color="#94a3b8" />}
            />
          </div>
          {onRefresh && (
            <BaseButton size="sm" variant="outline" onClick={onRefresh}>
              Refresh
            </BaseButton>
          )}
        </div>
      )}

      {isTableLoading ? (
        <div style={{ padding: 40, textAlign: "center" }}>
          <Spinner size="lg" />
          <Text style={{ marginTop: 12 }} color="muted">Loading {resource.plural.toLowerCase()}...</Text>
        </div>
      ) : items.length === 0 ? (
        <div style={{ padding: 48, textAlign: "center" }}>
          <Text size="lg" weight="bold">No {resource.plural} found</Text>
          <Text color="muted" style={{ marginTop: 6 }}>
            {search ? "No records match your search criteria." : `Get started by creating your first ${resource.singular.toLowerCase()}.`}
          </Text>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                {displayFields.map((field) => (
                  <th key={field.name} style={{ padding: "12px 16px", fontWeight: 700, color: "#475569" }}>
                    {field.label || field.name}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700, color: "#475569" }}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                  }}
                >
                  {displayFields.map((field) => (
                    <td key={field.name} style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                      {String(item[field.name] !== undefined ? item[field.name] : "")}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td style={{ padding: "14px 16px", textAlign: "right", verticalAlign: "middle" }}>
                      <div style={{ display: "inline-flex", gap: 8 }}>
                        {onEdit && (
                          <BaseButton
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(item)}
                            title={`Edit ${resource.singular}`}
                          >
                            <Edit2 size={14} style={{ marginRight: 4 }} /> Edit
                          </BaseButton>
                        )}
                        {onDelete && (
                          <BaseButton
                            size="sm"
                            variant="danger"
                            onClick={() => onDelete(item)}
                            title={`Delete ${resource.singular}`}
                          >
                            <Trash2 size={14} style={{ marginRight: 4 }} /> Delete
                          </BaseButton>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </BaseCard>
  );
}

export interface ResourcePageProps {
  resource: ResourceDefinition;
  apiOptions?: { baseUrl?: string; mockFallback?: boolean };
  initialItems?: any[];
  title?: string;
  subtitle?: string;
}

/**
 * ResourcePage:
 * High-level turnkey page component that generates the complete CRUD workflow:
 * - Table view with search
 * - Add Record modal with schema validation
 * - Edit Record modal with entity population
 * - Delete confirmation modal
 */
export function ResourcePage({
  resource,
  apiOptions = { mockFallback: true },
  initialItems = [],
  title,
  subtitle,
}: ResourcePageProps) {
  const [api] = useState(() => createResourceApi(resource.name, resource.endpoint, apiOptions));
  const [items, setItems] = useState<any[]>(initialItems);
  const [loading, setLoading] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.list();
      setItems(data);
    } catch (err) {
      console.error(`Failed to refresh ${resource.plural}:`, err);
    } finally {
      setLoading(false);
    }
  }, [api, resource.plural]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCreateSubmit = async (values: any) => {
    setIsMutating(true);
    try {
      await api.create(values);
      setIsCreateOpen(false);
      await refresh();
    } finally {
      setIsMutating(false);
    }
  };

  const handleEditSubmit = async (values: any) => {
    if (!activeItem) return;
    setIsMutating(true);
    try {
      await api.update(activeItem.id, values);
      setIsEditOpen(false);
      setActiveItem(null);
      await refresh();
    } finally {
      setIsMutating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!activeItem) return;
    setIsMutating(true);
    try {
      await api.delete(activeItem.id);
      setIsDeleteOpen(false);
      setActiveItem(null);
      await refresh();
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <Heading level={1}>{title || resource.plural}</Heading>
          <Text color="muted" style={{ marginTop: 4 }}>
            {subtitle || `Manage and synchronize all ${resource.plural.toLowerCase()} in your application.`}
          </Text>
        </div>
        <BaseButton
          variant="primary"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus size={16} style={{ marginRight: 6 }} /> Add {resource.singular}
        </BaseButton>
      </div>

      <ResourceTable
        resource={resource}
        items={items}
        isLoading={loading}
        onEdit={(item) => {
          setActiveItem(item);
          setIsEditOpen(true);
        }}
        onDelete={(item) => {
          setActiveItem(item);
          setIsDeleteOpen(true);
        }}
        onRefresh={refresh}
      />

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={`Add New ${resource.singular}`}
        size="md"
      >
        <SchemaForm
          fields={resource.fields}
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateOpen(false)}
          submitLabel={`Create ${resource.singular}`}
          isSubmitting={isMutating}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setActiveItem(null);
        }}
        title={`Edit ${resource.singular}`}
        size="md"
      >
        {activeItem && (
          <SchemaForm
            fields={resource.fields}
            initialValues={activeItem}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setIsEditOpen(false);
              setActiveItem(null);
            }}
            submitLabel="Save Changes"
            isSubmitting={isMutating}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setActiveItem(null);
        }}
        title={`Delete ${resource.singular}`}
        size="sm"
      >
        <BaseStack direction="column" spacing="1rem">
          <Text>
            Are you sure you want to delete this {resource.singular.toLowerCase()}? This action will remove the record.
          </Text>
          {activeItem && (
            <div style={{ padding: 12, backgroundColor: "#f8fafc", borderRadius: 6, fontSize: "0.875rem" }}>
              <strong>{activeItem.name || activeItem.title || `ID: ${activeItem.id}`}</strong>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 12 }}>
            <BaseButton
              variant="ghost"
              onClick={() => {
                setIsDeleteOpen(false);
                setActiveItem(null);
              }}
              disabled={isMutating}
            >
              Cancel
            </BaseButton>
            <BaseButton
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={isMutating}
            >
              Confirm Delete
            </BaseButton>
          </div>
        </BaseStack>
      </Modal>
    </div>
  );
}
