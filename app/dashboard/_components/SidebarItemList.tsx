"use client";

import { motion, easeOut } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Item } from "../_lib/types";
import { getItemName } from "../_lib/selectors";

interface SidebarItemListProps {
    itemIds: number[];
    items: Record<number, Item>;
    selectedItemId: number | null;
    onSelectItem: (itemId: number) => void;
}

export function SidebarItemList({
    itemIds,
    items,
    selectedItemId,
    onSelectItem,
}: SidebarItemListProps) {
    return (
        <div className="pt-4 border-t">
            <h3 className="text-xs lg:text-sm font-semibold text-muted-foreground mb-2 px-4">
                Items
            </h3>
            <div className="space-y-1 max-h-64">
                {itemIds.map((itemId) => {
                    const itemName = getItemName(items, itemId);
                    const isSelected = selectedItemId === itemId;

                    return (
                        <motion.button
                            key={itemId}
                            onClick={() => onSelectItem(itemId)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-xs lg:text-sm transition-colors ${
                                isSelected
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                            whileHover={{
                                x: !isSelected ? 4 : 0,
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ ease: easeOut }}
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    isSelected
                                        ? "bg-primary"
                                        : "bg-muted-foreground/30"
                                }`}
                            />
                            <span className="truncate">{itemName}</span>
                            {isSelected && (
                                <ChevronRight className="w-3 h-3 ml-auto" />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
