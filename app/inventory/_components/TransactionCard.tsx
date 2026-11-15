"use client";

import { motion, easeOut } from "framer-motion";
import { Edit, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Transaction } from "../_lib/types";
import { getTransactionProfit } from "../_lib/calc";
import { formatCurrency, formatDate } from "../_lib/format";

interface TransactionCardProps {
    transaction: Transaction;
    index: number;
    itemName: string;
    onEdit: (transaction: Transaction) => void;
}

/** Mobile layout for one transaction */
export function TransactionCard({
    transaction,
    index,
    itemName,
    onEdit,
}: TransactionCardProps) {
    const profit = getTransactionProfit(transaction);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05, ease: easeOut }}
            className="border rounded-lg p-4 bg-card"
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-medium">{itemName}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        ID: {transaction.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Buy Qty: {transaction.total_buy}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Sell Qty: {transaction.total_sell}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Cost Price:{" "}
                        {formatCurrency(parseFloat(transaction.cost_price))}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Sell Price:{" "}
                        {formatCurrency(parseFloat(transaction.selling_price))}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Profit:{" "}
                        <Badge variant={profit >= 0 ? "default" : "destructive"}>
                            {formatCurrency(profit)}
                        </Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Date: {formatDate(transaction.transaction_date)}
                    </p>
                </div>
                <div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(transaction)}
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
