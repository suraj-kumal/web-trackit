"use client";

import { motion } from "framer-motion";
import type { Item, TransactionData } from "../_lib/types";
import { formatCurrency } from "../_lib/format";
import { containerVariants } from "../_lib/variants";
import { KeyMetrics } from "./KeyMetrics";
import { PerformanceCard } from "./PerformanceCard";
import { TopPerformingItems } from "./TopPerformingItems";
import { RecentTransactions } from "./RecentTransactions";
import { TrendChart } from "./TrendChart";
import { StockHealth } from "./StockHealth";
import { BelowCostAlert } from "./BelowCostAlert";

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
            {/* Sales recorded below cost (hidden when none) */}
            <BelowCostAlert transactions={data?.transaction} items={items} />

            {/* Key Metrics Cards */}
            <KeyMetrics data={data} />

            {/* Revenue & profit over time */}
            <TrendChart transactions={data?.transaction} />

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
                growth={data?.weekly_growth_rate_percent}
                growthLabel="vs same days last week"
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
                growth={data?.monthly_growth_rate_percent}
                growthLabel="vs same days last month"
            />

            {/* Top items by profit */}
            <TopPerformingItems
                topItems={data?.item_performance}
                items={items}
                onSelectItem={onSelectItem}
            />

            {/* Reorder / dead-stock insight */}
            <StockHealth
                data={data}
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
