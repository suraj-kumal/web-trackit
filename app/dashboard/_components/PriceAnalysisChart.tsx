"use client";

import { motion } from "framer-motion";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { ItemChartData } from "../_lib/types";
import { formatCurrency, formatDate } from "../_lib/format";
import { itemVariants } from "../_lib/variants";
import {
    axisTick,
    tooltipContentStyle,
    tooltipLabelStyle,
} from "../_lib/chartStyles";

interface PriceAnalysisChartProps {
    itemId: number;
    data: ItemChartData[];
}

export function PriceAnalysisChart({ itemId, data }: PriceAnalysisChartProps) {
    return (
        <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-semibold mb-4">
                Price Analysis
            </h4>
            <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id={`colorCost${itemId}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id={`colorSelling${itemId}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#8b5cf6"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#8b5cf6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-muted"
                        />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            className="text-xs"
                            tick={axisTick}
                        />
                        <YAxis className="text-xs" tick={axisTick} />
                        <Tooltip
                            formatter={(value: any, name: string) => [
                                formatCurrency(Number(value)),
                                name,
                            ]}
                            labelFormatter={(label) =>
                                `Date: ${formatDate(label)}`
                            }
                            contentStyle={tooltipContentStyle}
                            labelStyle={tooltipLabelStyle}
                        />
                        <Area
                            type="monotone"
                            dataKey="sellingPrice"
                            name="Selling Price"
                            stroke="hsl(var(--foreground))"
                            fill={`url(#colorSelling${itemId})`}
                            strokeWidth={2}
                        />
                        <Area
                            type="monotone"
                            dataKey="costPrice"
                            name="Cost Price"
                            stroke="hsl(var(--foreground))"
                            fill={`url(#colorCost${itemId})`}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
