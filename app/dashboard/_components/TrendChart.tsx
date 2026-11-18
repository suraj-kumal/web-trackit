"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Transaction } from "../_lib/types";
import { buildTrendSeries, type TrendRange } from "../_lib/analytics";
import { formatCurrency, formatDate } from "../_lib/format";
import { itemVariants } from "../_lib/variants";
import {
    axisTick,
    tooltipContentStyle,
    tooltipItemStyle,
    tooltipLabelStyle,
} from "../_lib/chartStyles";

type View = "money" | "units";

const RANGES: { value: TrendRange; label: string }[] = [
    { value: 7, label: "7D" },
    { value: 30, label: "30D" },
    { value: 90, label: "90D" },
    { value: "all", label: "All" },
];

export function TrendChart({
    transactions,
}: {
    transactions: Transaction[] | undefined;
}) {
    const [range, setRange] = useState<TrendRange>(30);
    const [view, setView] = useState<View>("money");
    const data = useMemo(
        () => buildTrendSeries(transactions, range),
        [transactions, range],
    );

    return (
        <motion.div variants={itemVariants}>
            <Card className="mb-6 lg:mb-8">
                <CardHeader className="flex flex-row items-center justify-between gap-2">
                    <CardTitle className="text-base lg:text-lg">
                        {view === "money" ? "Revenue & Profit" : "Units Sold per Day"}
                    </CardTitle>
                    <div className="flex flex-wrap justify-end gap-2">
                    <div className="flex gap-1" role="group" aria-label="Chart type">
                        {([["money", "Revenue & profit"], ["units", "Units"]] as const).map(([v, label]) => (
                            <Button
                                key={v}
                                size="sm"
                                variant={view === v ? "default" : "outline"}
                                aria-pressed={view === v}
                                onClick={() => setView(v)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    <div className="flex gap-1" role="group" aria-label="Date range">
                        {RANGES.map((r) => (
                            <Button
                                key={String(r.value)}
                                size="sm"
                                variant={range === r.value ? "default" : "outline"}
                                aria-pressed={range === r.value}
                                onClick={() => setRange(r.value)}
                            >
                                {r.label}
                            </Button>
                        ))}
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {data.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8 text-xs lg:text-sm">
                            Record a sale to see your trend
                        </div>
                    ) : (
                        <div className="h-[220px] md:h-[280px]">
                            {view === "money" ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="trendRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="trendProfit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatDate}
                                        tick={axisTick}
                                        minTickGap={24}
                                    />
                                    <YAxis tick={axisTick} width={48} />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            formatCurrency(Number(value)),
                                            String(name),
                                        ]}
                                        labelFormatter={(label) => formatDate(String(label))}
                                        contentStyle={tooltipContentStyle}
                                        labelStyle={tooltipLabelStyle}
                                        itemStyle={tooltipItemStyle}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        name="Revenue"
                                        stroke="#3b82f6"
                                        fill="url(#trendRevenue)"
                                        strokeWidth={2}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="profit"
                                        name="Profit"
                                        stroke="#22c55e"
                                        fill="url(#trendProfit)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatDate}
                                        tick={axisTick}
                                        minTickGap={24}
                                    />
                                    <YAxis tick={axisTick} width={36} allowDecimals={false} />
                                    <Tooltip
                                        formatter={(value) => [String(value), "Units sold"]}
                                        labelFormatter={(label) => formatDate(String(label))}
                                        contentStyle={tooltipContentStyle}
                                        labelStyle={tooltipLabelStyle}
                                        itemStyle={tooltipItemStyle}
                                        cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                                    />
                                    <Bar dataKey="units" name="Units sold" fill="#8b5cf6" />
                                </BarChart>
                            </ResponsiveContainer>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
