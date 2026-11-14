"use client";

import { motion } from "framer-motion";
import { ArrowUp, BarChart3, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import type { TransactionData } from "../_lib/types";
import { formatCurrency } from "../_lib/format";
import { containerVariants } from "../_lib/variants";
import { MetricCard } from "./MetricCard";

export function KeyMetrics({ data }: { data: TransactionData | null }) {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8"
            variants={containerVariants}
        >
            {/* Total Revenue */}
            <MetricCard
                title="Total Revenue"
                icon={DollarSign}
                value={formatCurrency(data?.revenue || 0)}
                footer={
                    <div className="flex items-center text-xs text-muted-foreground">
                        <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500 font-medium">
                            {data?.weekly_growth_rate_percent || 0}%
                        </span>
                        <span className="ml-1">vs last week</span>
                    </div>
                }
            />

            {/* Net Profit */}
            <MetricCard
                title="Net Profit"
                icon={TrendingUp}
                value={formatCurrency(data?.total_net_profit || 0)}
                footer={
                    <div className="text-xs text-muted-foreground">
                        <span className="font-medium">
                            {data?.profit_margin_percent?.toFixed(1) || 0}%
                        </span>
                        <span className="ml-1">profit margin</span>
                    </div>
                }
            />

            {/* Total Sales */}
            <MetricCard
                title="Total Sales"
                icon={ShoppingCart}
                value={data?.total_sell || 0}
                footer={
                    <div className="text-xs text-muted-foreground">
                        <span className="font-medium">
                            {data?.stock_left || 0}
                        </span>
                        <span className="ml-1">items in stock</span>
                    </div>
                }
            />

            {/* ROI */}
            <MetricCard
                title="ROI"
                icon={BarChart3}
                value={`${data?.return_on_investment_percent?.toFixed(1) || 0}%`}
                footer={
                    <div className="text-xs text-muted-foreground">
                        <span className="font-medium">
                            {formatCurrency(data?.total_investment || 0)}
                        </span>
                        <span className="ml-1">invested</span>
                    </div>
                }
            />
        </motion.div>
    );
}
