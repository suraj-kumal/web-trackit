"use client";

import { motion, easeOut } from "framer-motion";
import { Calendar, Edit, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import type { Transaction } from "../_lib/types";
import { getTransactionProfit } from "../_lib/calc";
import { formatCurrency, formatDate } from "../_lib/format";

interface TransactionTableRowProps {
    transaction: Transaction;
    index: number;
    itemName: string;
    onEdit: (transaction: Transaction) => void;
}

export function TransactionTableRow({
    transaction,
    index,
    itemName,
    onEdit,
}: TransactionTableRowProps) {
    const profit = getTransactionProfit(transaction);

    return (
        <motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                delay: index * 0.05,
                ease: easeOut,
            }}
            className="border-b transition-colors hover:bg-muted/50"
        >
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    {itemName}
                </div>
            </TableCell>
            <TableCell className="text-right">{transaction.total_buy}</TableCell>
            <TableCell className="text-right">{transaction.total_sell}</TableCell>
            <TableCell className="text-right">
                {formatCurrency(parseFloat(transaction.cost_price))}
            </TableCell>
            <TableCell className="text-right">
                {formatCurrency(parseFloat(transaction.selling_price))}
            </TableCell>
            <TableCell className="text-right">
                <Badge variant={profit >= 0 ? "default" : "destructive"}>
                    {formatCurrency(profit)}
                </Badge>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    {formatDate(transaction.transaction_date)}
                </div>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(transaction)}
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                </div>
            </TableCell>
        </motion.tr>
    );
}
