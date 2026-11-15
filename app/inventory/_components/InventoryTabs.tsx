"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Item, Transaction } from "../_lib/types";
import { itemVariants } from "../_lib/variants";
import { ItemsTab } from "./ItemsTab";
import { TransactionsTab } from "./TransactionsTab";

interface InventoryTabsProps {
    items: Item[];
    transactions: Transaction[];
    filteredItems: Item[];
    filteredTransactions: Transaction[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    transactionSearchTerm: string;
    onTransactionSearchChange: (value: string) => void;
    getItemName: (itemId: number) => string;
    onEditItem: (item: Item) => void;
    onDeleteItem: (id: number) => void;
    onEditTransaction: (transaction: Transaction) => void;
}

export function InventoryTabs({
    items,
    transactions,
    filteredItems,
    filteredTransactions,
    searchTerm,
    onSearchChange,
    transactionSearchTerm,
    onTransactionSearchChange,
    getItemName,
    onEditItem,
    onDeleteItem,
    onEditTransaction,
}: InventoryTabsProps) {
    return (
        <motion.div variants={itemVariants}>
            <Tabs defaultValue="items" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="items">Items ({items.length})</TabsTrigger>
                    <TabsTrigger value="transactions">
                        Transactions ({transactions.length})
                    </TabsTrigger>
                </TabsList>

                {/* Items Tab */}
                <TabsContent value="items" className="space-y-6">
                    <ItemsTab
                        items={filteredItems}
                        searchTerm={searchTerm}
                        onSearchChange={onSearchChange}
                        onEdit={onEditItem}
                        onDelete={onDeleteItem}
                    />
                </TabsContent>

                {/* Transactions Tab */}
                <TabsContent value="transactions" className="space-y-6">
                    <TransactionsTab
                        transactions={filteredTransactions}
                        searchTerm={transactionSearchTerm}
                        onSearchChange={onTransactionSearchChange}
                        getItemName={getItemName}
                        onEdit={onEditTransaction}
                    />
                </TabsContent>
            </Tabs>
        </motion.div>
    );
}
