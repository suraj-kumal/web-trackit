"use client";

import type { FormEvent } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Item, ItemForm } from "../_lib/types";

interface ItemFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingItem: Item | null;
    form: ItemForm;
    onNameChange: (name: string) => void;
    isSubmitting: boolean;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

export function ItemFormDialog({
    open,
    onOpenChange,
    editingItem,
    form,
    onNameChange,
    isSubmitting,
    onSubmit,
    onCancel,
}: ItemFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {editingItem ? "Edit Item" : "Add New Item"}
                    </DialogTitle>
                    <DialogDescription>
                        {editingItem
                            ? "Update item details"
                            : "Create a new item to track in your inventory"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input
                                id="name"
                                value={form.name}
                                onChange={(e) => onNameChange(e.target.value)}
                                placeholder="Enter item name"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            {isSubmitting && (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            {editingItem ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
