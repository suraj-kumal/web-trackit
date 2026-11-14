"use client";

import { motion } from "framer-motion";
import type { Item, TransactionData } from "../_lib/types";
import { formatCurrency } from "../_lib/format";
import { containerVariants } from "../_lib/variants";
import { KeyMetrics } from "./KeyMetrics";
import { PerformanceCard } from "./PerformanceCard";
import { TopPerformingItems } from "./TopPerformingItems";
import { RecentTransactions } from "./RecentTransactions";

interface DashboardOverviewProps {
    data: TransactionData | null;
    items: Record<number, Item>;
    onSelectItem: (itemId: number) => void;
}

export function DashboardOverview({
    data,
    items,
    onSelectItem,
}: DashboardOverviewProps) {
    return (
        <motion.div
            key="dashboard"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
            {/* Key Metrics Cards */}
            <KeyMetrics data={data} />

            {/* Weekly Performance */}
            <PerformanceCard
                title="Weekly Performance"
                description="Performance metrics for this week"
                revenue={formatCurrency(data?.this_week_revenue || 0)}
                avgDailyRevenue={formatCurrency(data?.avg_daily_revenue || 0)}
                netProfit={formatCurrency(data?.this_week_net_profit || 0)}
                margin={data?.weekly_profit_margin_percent?.toFixed(1)}
                salesVolume={data?.weekly_sales_volume || 0}
                avgDailySales={data?.avg_daily_sales?.toFixed(1)}
            />

            {/* Monthly Performance */}
            <PerformanceCard
                title="Monthly Performance"
                description="Performance metrics for this month"
                revenue={formatCurrency(data?.this_month_revenue || 0)}
                avgDailyRevenue={formatCurrency(
                    data?.avg_monthly_daily_revenue || 0,
                )}
                netProfit={formatCurrency(data?.this_month_net_profit || 0)}
                margin={data?.monthly_profit_margin_percent?.toFixed(1)}
                salesVolume={data?.monthly_sales_volume || 0}
                avgDailySales={data?.avg_monthly_daily_sales?.toFixed(1)}
            />

            {/* Top Performing Items */}
            <TopPerformingItems
                topItems={data?.top_performing_items}
                items={items}
                onSelectItem={onSelectItem}
            />

            {/* Recent Transactions */}
            <RecentTransactions
                transactions={data?.transaction}
                items={items}
            />
        </motion.div>
    );
}
