"use client";

import { AnimatePresence } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Transaction } from "../_lib/types";
import { EmptyState } from "./EmptyState";
import { TransactionCard } from "./TransactionCard";
import { TransactionTableRow } from "./TransactionTableRow";

interface TransactionsTabProps {
    transactions: Transaction[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    getItemName: (itemId: number) => string;
    onEdit: (transaction: Transaction) => void;
}

export function TransactionsTab({
    transactions,
    searchTerm,
    onSearchChange,
    getItemName,
    onEdit,
}: TransactionsTabProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            Track all your inventory transactions
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 w-full sm:w-64">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by item name..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="hidden sm:table">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-right">
                                    Buy Qty
                                </TableHead>
                                <TableHead className="text-right">
                                    Sell Qty
                                </TableHead>
                                <TableHead className="text-right">
                                    Cost Price
                                </TableHead>
                                <TableHead className="text-right">
                                    Sell Price
                                </TableHead>
                                <TableHead className="text-right">
                                    Profit
                                </TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {transactions.map((transaction, index) => (
                                    <TransactionTableRow
                                        key={transaction.id}
                                        transaction={transaction}
                                        index={index}
                                        itemName={getItemName(
                                            transaction.item_id,
                                        )}
                                        onEdit={onEdit}
                                    />
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                    {/* Mobile card layout for transactions */}
                    <div className="sm:hidden space-y-4">
                        <AnimatePresence>
                            {transactions.map((transaction, index) => (
                                <TransactionCard
                                    key={transaction.id}
                                    transaction={transaction}
                                    index={index}
                                    itemName={getItemName(transaction.item_id)}
                                    onEdit={onEdit}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                    {transactions.length === 0 && (
                        <EmptyState
                            icon={ShoppingCart}
                            title="No transactions found"
                            searchTerm={searchTerm}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
