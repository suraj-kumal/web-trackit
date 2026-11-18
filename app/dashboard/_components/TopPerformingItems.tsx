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
    // item_performance, already sorted by profit (highest first)
    topItems: ItemPerformance[] | undefined;
    items: Record<number, Item>;
    onSelectItem: (itemId: number) => void;
}

export function TopPerformingItems({
    topItems,
    items,
    onSelectItem,
}: TopPerformingItemsProps) {
    // Top 5 by profit, each with its share of total profit
    const ranked = topItems?.filter((i) => i.profit > 0).slice(0, 5);
    const totalProfit = topItems?.reduce((sum, i) => sum + Math.max(i.profit, 0), 0) ?? 0;

    return (
        <motion.div variants={itemVariants}>
            <Card className="mb-6 lg:mb-8">
                <CardHeader>
                    <CardTitle className="text-base lg:text-lg">
                        Top Items by Profit
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {ranked && ranked.length > 0 ? (
                        ranked.map((item, index) => (
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
                                        <div
                                            className="mt-1.5 h-1.5 w-28 sm:w-40 overflow-hidden rounded-full bg-muted"
                                            aria-hidden="true"
                                        >
                                            <motion.div
                                                className="h-full origin-left bg-primary"
                                                style={{
                                                    width: `${totalProfit > 0 ? (item.profit / totalProfit) * 100 : 0}%`,
                                                }}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{
                                                    delay: 0.4 + index * 0.05,
                                                    duration: 0.5,
                                                    ease: easeOut,
                                                }}
                                            />
                                        </div>
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
                            No profitable items yet. Record a sale to see your best sellers.
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
