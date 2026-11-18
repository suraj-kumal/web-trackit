"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { Item, Transaction } from "../_lib/types";
import { findBelowCostSales } from "../_lib/analytics";
import { formatCurrency, formatDate } from "../_lib/format";
import { getItemName } from "../_lib/selectors";
import { itemVariants } from "../_lib/variants";

/** Warns about sales recorded below cost. Renders nothing when there are none. */
export function BelowCostAlert({
    transactions,
    items,
}: {
    transactions: Transaction[] | undefined;
    items: Record<number, Item>;
}) {
    const sales = findBelowCostSales(transactions);
    if (sales.length === 0) return null;

    const latest = [...sales]
        .sort(
            (a, b) =>
                new Date(b.transaction_date).getTime() -
                    new Date(a.transaction_date).getTime() || b.id - a.id,
        )
        .slice(0, 3);

    return (
        <motion.div
            variants={itemVariants}
            role="alert"
            className="mb-6 lg:mb-8 rounded-lg border border-red-500/40 bg-red-500/10 p-4"
        >
            <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                <div className="min-w-0 text-xs lg:text-sm">
                    <p className="font-semibold">
                        {sales.length} {sales.length === 1 ? "sale was" : "sales were"} recorded
                        below cost price
                    </p>
                    <ul className="mt-1 space-y-0.5 text-muted-foreground">
                        {latest.map((t) => (
                            <li key={t.id} className="truncate">
                                {getItemName(items, t.item_id)} on {formatDate(t.transaction_date)}:
                                sold at {formatCurrency(Number(t.selling_price))}, cost{" "}
                                {formatCurrency(Number(t.cost_price))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
