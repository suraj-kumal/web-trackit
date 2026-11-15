"use client";

import { useState } from "react";
import type { Item, ItemForm } from "../_lib/types";

export function useItemDialog() {
    const [itemDialogOpen, setItemDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [itemForm, setItemForm] = useState<ItemForm>({ name: "" });

    const resetItemForm = () => {
        setEditingItem(null);
        setItemForm({ name: "" });
    };

    const handleOpenChange = (open: boolean) => {
        setItemDialogOpen(open);
        if (!open) resetItemForm();
    };

    const handleEditItem = (item: Item) => {
        setEditingItem(item);
        setItemForm({ name: item.name });
        setItemDialogOpen(true);
    };

    // Runs after a successful create / update
    const closeAndReset = () => {
        setItemDialogOpen(false);
        setEditingItem(null);
        setItemForm({ name: "" });
    };

    return {
        itemDialogOpen,
        setItemDialogOpen,
        editingItem,
        itemForm,
        setItemForm,
        handleOpenChange,
        handleEditItem,
        closeAndReset,
    };
}
