"use client";

import { motion } from "framer-motion";
import { DollarSign, Package, ShoppingCart } from "lucide-react";
import type { Item, Transaction } from "../_lib/types";
import { itemVariants } from "../_lib/variants";
import { StatCard } from "./StatCard";

interface SummaryStatsProps {
    items: Item[];
    transactions: Transaction[];
}

export function SummaryStats({ items, transactions }: SummaryStatsProps) {
    return (
        <motion.div
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            variants={itemVariants}
        >
            <StatCard
                icon={Package}
                title="Total Items"
                value={items.length}
                caption="Items in your inventory"
            />
            <StatCard
                icon={ShoppingCart}
                title="Total Transactions"
                value={transactions.length}
                caption="Recorded transactions"
            />
            <StatCard
                icon={DollarSign}
                title="Total Stock"
                value={transactions.reduce(
                    (acc, t) => acc + (t.total_buy - t.total_sell),
                    0,
                )}
                caption="Items remaining in stock"
            />
        </motion.div>
    );
}
