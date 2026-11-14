"use client";

import { motion } from "framer-motion";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { ItemChartData } from "../_lib/types";
import { formatDate } from "../_lib/format";
import { itemVariants } from "../_lib/variants";
import {
    axisTick,
    tooltipContentStyle,
    tooltipItemStyle,
    tooltipLabelStyle,
} from "../_lib/chartStyles";

interface VolumeChartProps {
    title: string;
    data: ItemChartData[];
    dataKey: "totalSell" | "totalBuy";
    color: string;
    tooltipName: string;
}

/** Shared line chart for Sales Volume and Purchase Volume. */
export function VolumeChart({
    title,
    data,
    dataKey,
    color,
    tooltipName,
}: VolumeChartProps) {
    return (
        <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-semibold mb-4">
                {title}
            </h4>
            <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                            formatter={(value: any) => [value, tooltipName]}
                            labelFormatter={(label) =>
                                `Date: ${formatDate(label)}`
                            }
                            contentStyle={tooltipContentStyle}
                            labelStyle={tooltipLabelStyle}
                            itemStyle={tooltipItemStyle}
                        />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            dot={{
                                fill: color,
                                strokeWidth: 2,
                                r: 4,
                            }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
