"use client";

import { useState } from "react";
import { getEmptyTransactionForm } from "../_lib/forms";
import type { Transaction, TransactionForm } from "../_lib/types";

export function useTransactionDialog() {
    const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);
    const [transactionForm, setTransactionForm] = useState<TransactionForm>(
        getEmptyTransactionForm,
    );

    const resetTransactionForm = () => {
        setEditingTransaction(null);
        setTransactionForm(getEmptyTransactionForm());
    };

    const handleOpenChange = (open: boolean) => {
        setTransactionDialogOpen(open);
        if (!open) resetTransactionForm();
    };

    const handleEditTransaction = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setTransactionForm({
            item_id: transaction.item_id.toString(),
            total_buy: transaction.total_buy.toString(),
            total_sell: transaction.total_sell.toString(),
            cost_price: transaction.cost_price,
            selling_price: transaction.selling_price,
            transaction_date: transaction.transaction_date,
        });
        setTransactionDialogOpen(true);
    };

    // Same as `setTransactionForm({ ...transactionForm, field })` in the original
    const updateForm = (patch: Partial<TransactionForm>) => {
        setTransactionForm({ ...transactionForm, ...patch });
    };

    // Runs after a successful create / update
    const closeAndReset = () => {
        setTransactionDialogOpen(false);
        setEditingTransaction(null);
        setTransactionForm(getEmptyTransactionForm());
    };

    return {
        transactionDialogOpen,
        setTransactionDialogOpen,
        editingTransaction,
        transactionForm,
        handleOpenChange,
        handleEditTransaction,
        updateForm,
        closeAndReset,
    };
}
