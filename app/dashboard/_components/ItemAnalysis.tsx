"use client";

import { motion } from "framer-motion";
import { itemViewVariants } from "../_lib/variants";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Item, TransactionData } from "../_lib/types";
import {
    getItemName,
    getItemPerformance,
    prepareItemChartData,
} from "../_lib/selectors";
import { ItemPerformanceSummary } from "./ItemPerformanceSummary";
import { PriceAnalysisChart } from "./PriceAnalysisChart";
import { VolumeChart } from "./VolumeChart";

interface ItemAnalysisProps {
    itemId: number;
    items: Record<number, Item>;
    transactionData: TransactionData | null;
    onBack: () => void;
}

export function ItemAnalysis({
    itemId,
    items,
    transactionData,
    onBack,
}: ItemAnalysisProps) {
    const chartData = prepareItemChartData(transactionData, itemId);
    const itemName = getItemName(items, itemId);
    const itemPerformance = getItemPerformance(transactionData, itemId);

    return (
        <motion.div
            key={`item-${itemId}`}
            variants={itemViewVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-primary" />
                            <div>
                                <CardTitle className="text-sm md:text-base">
                                    {itemName}
                                </CardTitle>
                                <CardDescription className="text-xs md:text-sm">
                                    Detailed performance analysis
                                </CardDescription>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs md:text-sm"
                            onClick={onBack}
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Item Performance Summary */}
                    {itemPerformance && (
                        <ItemPerformanceSummary performance={itemPerformance} />
                    )}

                    {/* Price Analysis Chart */}
                    <PriceAnalysisChart itemId={itemId} data={chartData} />

                    {/* Sales Volume Chart */}
                    <VolumeChart
                        title="Sales Volume"
                        data={chartData}
                        dataKey="totalSell"
                        color="#8b5cf6"
                        tooltipName="Units Sold"
                    />

                    {/* Purchase Volume Chart */}
                    <VolumeChart
                        title="Purchase Volume"
                        data={chartData}
                        dataKey="totalBuy"
                        color="#3b82f6"
                        tooltipName="Units Purchased"
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}
