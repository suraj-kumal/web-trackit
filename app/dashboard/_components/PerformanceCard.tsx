"use client";

import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { itemVariants } from "../_lib/variants";

interface PerformanceCardProps {
    title: string;
    description: string;
    revenue: string;
    avgDailyRevenue: string;
    netProfit: string;
    margin: string | undefined;
    salesVolume: number;
    avgDailySales: string | undefined;
}

/** Shared layout for the Weekly and Monthly performance cards. */
export function PerformanceCard({
    title,
    description,
    revenue,
    avgDailyRevenue,
    netProfit,
    margin,
    salesVolume,
    avgDailySales,
}: PerformanceCardProps) {
    return (
        <motion.div variants={itemVariants}>
            <Card className="mb-6 lg:mb-8">
                <CardHeader>
                    <CardTitle className="text-base lg:text-lg">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-xs lg:text-sm">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                                Revenue
                            </p>
                            <p className="text-xl lg:text-2xl font-bold">
                                {revenue}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Avg. {avgDailyRevenue}/day
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                                Net Profit
                            </p>
                            <p className="text-xl lg:text-2xl font-bold">
                                {netProfit}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Margin: {margin}%
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                                Sales Volume
                            </p>
                            <p className="text-xl lg:text-2xl font-bold">
                                {salesVolume}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Avg. {avgDailySales}/day
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
