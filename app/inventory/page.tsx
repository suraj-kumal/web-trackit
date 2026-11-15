"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";

import { toast } from "./_lib/toast";
import { containerVariants } from "./_lib/variants";
import { useInventoryData } from "./_hooks/useInventoryData";
import { useItemDialog } from "./_hooks/useItemDialog";
import { useTransactionDialog } from "./_hooks/useTransactionDialog";

import { LoadingScreen } from "./_components/LoadingScreen";
import { InventoryHeader } from "./_components/InventoryHeader";
import { InventoryTabs } from "./_components/InventoryTabs";
import { SummaryStats } from "./_components/SummaryStats";

export default function InventoryPage() {
    const data = useInventoryData();
    const itemDialog = useItemDialog();
    const transactionDialog = useTransactionDialog();

    // Handle form submissions
    const handleItemSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { editingItem, itemForm, closeAndReset } = itemDialog;
        if (!itemForm.name.trim()) return;

        if (editingItem) {
            await data.updateItem(editingItem.id, itemForm.name, closeAndReset);
        } else {
            await data.createItem(itemForm.name, closeAndReset);
        }
    };

    const handleTransactionSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { editingTransaction, transactionForm, closeAndReset } =
            transactionDialog;
        if (
            !transactionForm.item_id ||
            !transactionForm.total_buy ||
            !transactionForm.total_sell ||
            !transactionForm.cost_price ||
            !transactionForm.selling_price
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        if (editingTransaction) {
            await data.updateTransaction(
                editingTransaction.id,
                transactionForm,
                closeAndReset,
            );
        } else {
            await data.createTransaction(transactionForm, closeAndReset);
        }
    };

    if (data.isLoading) return <LoadingScreen />;

    return (
        <motion.div
            className="p-4 sm:p-6 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <InventoryHeader
                itemDialog={itemDialog}
                transactionDialog={transactionDialog}
                items={data.items}
                isSubmitting={data.isSubmitting}
                onItemSubmit={handleItemSubmit}
                onTransactionSubmit={handleTransactionSubmit}
            />

            <InventoryTabs
                items={data.items}
                transactions={data.transactions}
                filteredItems={data.filteredItems}
                filteredTransactions={data.filteredTransactions}
                searchTerm={data.searchTerm}
                onSearchChange={data.setSearchTerm}
                transactionSearchTerm={data.transactionSearchTerm}
                onTransactionSearchChange={data.setTransactionSearchTerm}
                getItemName={data.getItemName}
                onEditItem={itemDialog.handleEditItem}
                onDeleteItem={data.deleteItem}
                onEditTransaction={transactionDialog.handleEditTransaction}
            />

            <SummaryStats
                items={data.items}
                transactions={data.transactions}
            />
        </motion.div>
    );
}
