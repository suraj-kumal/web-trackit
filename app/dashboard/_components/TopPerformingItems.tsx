"use client";

import { motion, easeOut } from "framer-motion";
import { ChevronRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Item, ItemPerformance } from "../_lib/types";
import { formatCurrency } from "../_lib/format";
import { getItemName } from "../_lib/selectors";
import { itemVariants } from "../_lib/variants";

interface TopPerformingItemsProps {
    topItems: ItemPerformance[] | undefined;
    items: Record<number, Item>;
    onSelectItem: (itemId: number) => void;
}

export function TopPerformingItems({
    topItems,
    items,
    onSelectItem,
}: TopPerformingItemsProps) {
    return (
        <motion.div variants={itemVariants}>
            <Card className="mb-6 lg:mb-8">
                <CardHeader>
                    <CardTitle className="text-base lg:text-lg">
                        Top Performing Items
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {topItems ? (
                        Object.values(topItems).map((item, index) => (
                            <motion.div
                                key={item.item_id}
                                className="flex items-center justify-between p-3 lg:p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.3 + index * 0.05,
                                    duration: 0.3,
                                    ease: easeOut,
                                }}
                                onClick={() => onSelectItem(item.item_id)}
                            >
                                <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Package className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-xs lg:text-sm truncate">
                                            {getItemName(items, item.item_id)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.sales_volume} units sold •{" "}
                                            {item.stock_left} in stock
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-2 flex-shrink-0">
                                    <div>
                                        <p className="font-semibold text-xs lg:text-sm">
                                            {formatCurrency(item.profit)}
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {item.profit_margin.toFixed(1)}%
                                            margin
                                        </Badge>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-8 text-xs lg:text-sm">
                            No top performing items available
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
