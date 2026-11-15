"use client";

import { motion, easeOut } from "framer-motion";
import { Package } from "lucide-react";
import type { Item } from "../_lib/types";
import { formatDate } from "../_lib/format";
import { ItemActions } from "./ItemActions";

interface ItemCardProps {
    item: Item;
    index: number;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

/** Mobile layout for one item */
export function ItemCard({ item, index, onEdit, onDelete }: ItemCardProps) {
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
                        <h3 className="font-medium">{item.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        ID: {item.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Created: {formatDate(item.created_at)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Updated: {formatDate(item.updated_at)}
                    </p>
                </div>
                <div className="flex gap-2">
                    <ItemActions item={item} onEdit={onEdit} onDelete={onDelete} />
                </div>
            </div>
        </motion.div>
    );
}
