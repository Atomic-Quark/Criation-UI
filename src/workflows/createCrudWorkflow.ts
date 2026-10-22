import { useState, useCallback } from "react";
import { useDataQuery } from "./useDataQuery";

export interface CrudRecord {
  id: string | number;
  [key: string]: any;
}

export interface CrudWorkflowConfig<T extends CrudRecord> {
  resourceName: string;
  fetchList: () => Promise<T[]>;
  createItem?: (item: Omit<T, "id">) => Promise<T>;
  updateItem?: (id: T["id"], item: Partial<T>) => Promise<T>;
  deleteItem?: (id: T["id"]) => Promise<void>;
  initialItems?: T[];
}

export interface CrudWorkflowResult<T extends CrudRecord> {
  items: T[];
  isLoading: boolean;
  error: Error | null;
  activeItem: T | null;
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  openCreate: () => void;
  openEdit: (item: T) => void;
  openDelete: (item: T) => void;
  closeModals: () => void;
  handleCreate: (data: Omit<T, "id">) => Promise<T | undefined>;
  handleUpdate: (id: T["id"], data: Partial<T>) => Promise<T | undefined>;
  handleDelete: (id: T["id"]) => Promise<boolean>;
  refresh: () => Promise<T[] | undefined>;
}

/**
 * useCrudWorkflow:
 * Complete declarative CRUD workflow managing data synchronization, modal states,
 * and optimistic or server-confirmed record mutation.
 */
export function useCrudWorkflow<T extends CrudRecord>(
  config: CrudWorkflowConfig<T>
): CrudWorkflowResult<T> {
  const { fetchList, createItem, updateItem, deleteItem, initialItems = [] } = config;

  const [localItems, setLocalItems] = useState<T[]>(initialItems);
  const [activeItem, setActiveItem] = useState<T | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, error, refetch } = useDataQuery<T[]>(
    fetchList,
    [],
    {
      initialData: initialItems,
      onSuccess: (fetched) => {
        setLocalItems(fetched);
      },
    }
  );

  const openCreate = useCallback(() => {
    setActiveItem(null);
    setIsCreateOpen(true);
  }, []);

  const openEdit = useCallback((item: T) => {
    setActiveItem(item);
    setIsEditOpen(true);
  }, []);

  const openDelete = useCallback((item: T) => {
    setActiveItem(item);
    setIsDeleteOpen(true);
  }, []);

  const closeModals = useCallback(() => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setActiveItem(null);
  }, []);

  const handleCreate = useCallback(
    async (formData: Omit<T, "id">): Promise<T | undefined> => {
      if (!createItem) return undefined;
      const created = await createItem(formData);
      setLocalItems((prev) => [created, ...prev]);
      closeModals();
      return created;
    },
    [createItem, closeModals]
  );

  const handleUpdate = useCallback(
    async (id: T["id"], updateData: Partial<T>): Promise<T | undefined> => {
      if (!updateItem) return undefined;
      const updated = await updateItem(id, updateData);
      setLocalItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
      );
      closeModals();
      return updated;
    },
    [updateItem, closeModals]
  );

  const handleDelete = useCallback(
    async (id: T["id"]): Promise<boolean> => {
      if (!deleteItem) return false;
      await deleteItem(id);
      setLocalItems((prev) => prev.filter((item) => item.id !== id));
      closeModals();
      return true;
    },
    [deleteItem, closeModals]
  );

  return {
    items: data || localItems,
    isLoading,
    error,
    activeItem,
    isCreateOpen,
    isEditOpen,
    isDeleteOpen,
    openCreate,
    openEdit,
    openDelete,
    closeModals,
    handleCreate,
    handleUpdate,
    handleDelete,
    refresh: refetch,
  };
}
