"use client";

import { motion, easeOut } from "framer-motion";
import { Package } from "lucide-react";
import { TableCell } from "@/components/ui/table";
import type { Item } from "../_lib/types";
import { formatDate } from "../_lib/format";
import { ItemActions } from "./ItemActions";

interface ItemTableRowProps {
    item: Item;
    index: number;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

export function ItemTableRow({ item, index, onEdit, onDelete }: ItemTableRowProps) {
    return (
        <motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05, ease: easeOut }}
            className="border-b transition-colors hover:bg-muted/50"
        >
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    {item.name}
                </div>
            </TableCell>
            <TableCell>{formatDate(item.created_at)}</TableCell>
            <TableCell>{formatDate(item.updated_at)}</TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <ItemActions item={item} onEdit={onEdit} onDelete={onDelete} />
                </div>
            </TableCell>
        </motion.tr>
    );
}
