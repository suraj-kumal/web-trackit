"use client";

import { motion } from "framer-motion";
import type { ItemPerformance } from "../_lib/types";
import { formatCurrency } from "../_lib/format";
import { itemVariants } from "../_lib/variants";

function Stat({
    label,
    value,
    fluid = false,
}: {
    label: string;
    value: string | number;
    fluid?: boolean;
}) {
    return (
        <div className="text-center">
            <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
            <p
                className={
                    fluid
                        ? "text-sm md:text-xl font-bold text-[min(4vw,1.25rem)]"
                        : "text-sm md:text-xl font-bold"
                }
            >
                {value}
            </p>
        </div>
    );
}

export function ItemPerformanceSummary({
    performance,
}: {
    performance: ItemPerformance;
}) {
    return (
        <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg"
        >
            <Stat
                label="Revenue"
                value={formatCurrency(performance.revenue)}
                fluid
            />
            <Stat
                label="Profit"
                value={formatCurrency(performance.profit)}
                fluid
            />
            <Stat label="Sales Volume" value={performance.sales_volume} />
            <Stat label="Stock Left" value={performance.stock_left} />
        </motion.div>
    );
}
