"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Item, ItemPerformance, TransactionData } from "../_lib/types";
import { getStockHealth } from "../_lib/analytics";
import { formatCurrency } from "../_lib/format";
import { getItemName } from "../_lib/selectors";
import { itemVariants } from "../_lib/variants";

function ItemRow({
    item,
    items,
    detail,
    onSelectItem,
}: {
    item: ItemPerformance;
    items: Record<number, Item>;
    detail: string;
    onSelectItem: (id: number) => void;
}) {
    return (
        <li>
            <button
                type="button"
                onClick={() => onSelectItem(item.item_id)}
                className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left text-xs lg:text-sm hover:bg-muted/60 transition-colors"
            >
                <span className="truncate font-medium">
                    {getItemName(items, item.item_id)}
                </span>
                <span className="flex-shrink-0 text-muted-foreground">
                    {detail}
                </span>
            </button>
        </li>
    );
}

function Column({
    title,
    empty,
    children,
    hasRows,
}: {
    title: string;
    empty: string;
    children: React.ReactNode;
    hasRows: boolean;
}) {
    return (
        <div>
            <h4 className="mb-2 text-xs lg:text-sm font-semibold">{title}</h4>
            {hasRows ? (
                <ul className="space-y-0.5">{children}</ul>
            ) : (
                <p className="px-2 text-xs text-muted-foreground">{empty}</p>
            )}
        </div>
    );
}

export function StockHealth({
    data,
    items,
    onSelectItem,
}: {
    data: TransactionData | null;
    items: Record<number, Item>;
    onSelectItem: (itemId: number) => void;
}) {
    const { stockValue, runningLow, notSelling } = getStockHealth(data);

    return (
        <motion.div variants={itemVariants}>
            <Card className="mb-6 lg:mb-8">
                <CardHeader>
                    <CardTitle className="text-base lg:text-lg">
                        Stock Health
                    </CardTitle>
                    {stockValue != null && (
                        <p className="text-xs lg:text-sm text-muted-foreground">
                            Stock on hand is worth{" "}
                            <span className="font-semibold text-foreground">
                                {formatCurrency(stockValue)}
                            </span>{" "}
                            at cost
                        </p>
                    )}
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Column
                        title="Running out soon (14 days or less)"
                        empty="No items are close to running out."
                        hasRows={runningLow.length > 0}
                    >
                        {runningLow.map((item) => (
                            <ItemRow
                                key={item.item_id}
                                item={item}
                                items={items}
                                onSelectItem={onSelectItem}
                                detail={`~${Math.ceil(item.days_of_stock_left ?? 0)} days · ${item.stock_left} left`}
                            />
                        ))}
                    </Column>
                    <Column
                        title="In stock, never sold"
                        empty="Every item in stock has sold at least once."
                        hasRows={notSelling.length > 0}
                    >
                        {notSelling.map((item) => (
                            <ItemRow
                                key={item.item_id}
                                item={item}
                                items={items}
                                onSelectItem={onSelectItem}
                                detail={`${item.stock_left} units${
                                    item.stock_value != null
                                        ? ` · ${formatCurrency(item.stock_value)}`
                                        : ""
                                }`}
                            />
                        ))}
                    </Column>
                </CardContent>
            </Card>
        </motion.div>
    );
}
