"use client";

import type { FormEvent } from "react";
import { Loader2, ShoppingCart } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Item, Transaction, TransactionForm } from "../_lib/types";

interface TransactionFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingTransaction: Transaction | null;
    form: TransactionForm;
    onChange: (patch: Partial<TransactionForm>) => void;
    items: Item[];
    isSubmitting: boolean;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

export function TransactionFormDialog({
    open,
    onOpenChange,
    editingTransaction,
    form,
    onChange,
    items,
    isSubmitting,
    onSubmit,
    onCancel,
}: TransactionFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                    <ShoppingCart className="w-4 h-4 Mr-2" />
                    Add Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {editingTransaction
                            ? "Edit Transaction"
                            : "Add New Transaction"}
                    </DialogTitle>
                    <DialogDescription>
                        {editingTransaction
                            ? "Update transaction details"
                            : "Record a new transaction for your inventory"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        {!editingTransaction && (
                            <div className="grid gap-2">
                                <Label htmlFor="item_id">Item</Label>
                                <Select
                                    value={form.item_id}
                                    onValueChange={(value: string) =>
                                        onChange({ item_id: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an item" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {items.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id.toString()}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="total_buy">Quantity Bought</Label>
                                <Input
                                    id="total_buy"
                                    type="number"
                                    value={form.total_buy}
                                    onChange={(e) =>
                                        onChange({ total_buy: e.target.value })
                                    }
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="total_sell">Quantity Sold</Label>
                                <Input
                                    id="total_sell"
                                    type="number"
                                    value={form.total_sell}
                                    onChange={(e) =>
                                        onChange({ total_sell: e.target.value })
                                    }
                                    placeholder="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="cost_price">Cost Price</Label>
                                <Input
                                    id="cost_price"
                                    type="number"
                                    step="0.01"
                                    value={form.cost_price}
                                    onChange={(e) =>
                                        onChange({ cost_price: e.target.value })
                                    }
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="selling_price">Selling Price</Label>
                                <Input
                                    id="selling_price"
                                    type="number"
                                    step="0.01"
                                    value={form.selling_price}
                                    onChange={(e) =>
                                        onChange({
                                            selling_price: e.target.value,
                                        })
                                    }
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="transaction_date">
                                Transaction Date
                            </Label>
                            <Input
                                id="transaction_date"
                                type="date"
                                value={form.transaction_date}
                                onChange={(e) =>
                                    onChange({
                                        transaction_date: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2 ">
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
                            {editingTransaction ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
