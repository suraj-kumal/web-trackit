"use client";

import { motion, easeOut } from "framer-motion";
import { Calendar, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Item, Transaction } from "../_lib/types";
import { formatCurrency } from "../_lib/format";
import { getItemName } from "../_lib/selectors";
import { itemVariants } from "../_lib/variants";
import { exportTransactionsCsv } from "../_lib/csv";

interface RecentTransactionsProps {
    transactions: Transaction[] | undefined;
    items: Record<number, Item>;
}

export function RecentTransactions({
    transactions,
    items,
}: RecentTransactionsProps) {
    // Newest first: today, then yesterday, and so on.
    // Same-day transactions: higher id (added later) comes first.
    const recent = transactions
        ? [...transactions]
              .sort(
                  (a, b) =>
                      new Date(b.transaction_date).getTime() -
                          new Date(a.transaction_date).getTime() ||
                      b.id - a.id,
              )
              .slice(0, 5)
        : undefined;

    return (
        <motion.div variants={itemVariants}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2">
                    <CardTitle className="text-sm sm:text-base lg:text-lg">
                        Recent Transactions
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!transactions?.length}
                        onClick={() =>
                            transactions &&
                            exportTransactionsCsv(transactions, items)
                        }
                    >
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Export CSV
                    </Button>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                    <div className="space-y-3 sm:space-y-4">
                        {recent?.map((transaction, index) => (
                            <motion.div
                                key={transaction.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b last:border-0 gap-2 sm:gap-0"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.35 + index * 0.05,
                                    duration: 0.3,
                                    ease: easeOut,
                                }}
                            >
                                {/* Main transaction info */}
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-sm sm:text-sm lg:text-base truncate">
                                            {getItemName(
                                                items,
                                                transaction.item_id,
                                            )}
                                        </p>
                                        <p className="text-xs sm:text-xs text-muted-foreground">
                                            {new Date(
                                                transaction.transaction_date,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Transaction details - stacked on mobile, inline on larger screens */}
                                <div className="flex flex-col sm:items-end gap-2 sm:gap-1 ml-9 sm:ml-0">
                                    {/* Badges */}
                                    <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                                        <Badge
                                            variant="outline"
                                            className="text-xs px-2 py-0.5 whitespace-nowrap"
                                        >
                                            Buy: {transaction.total_buy}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="text-xs px-2 py-0.5 whitespace-nowrap"
                                        >
                                            Sell: {transaction.total_sell}
                                        </Badge>
                                    </div>

                                    {/* Price info */}
                                    <div className="text-xs text-muted-foreground">
                                        <div className="flex flex-col sm:flex-row sm:gap-2">
                                            <span className="whitespace-nowrap">
                                                Cost:{" "}
                                                {formatCurrency(
                                                    parseFloat(
                                                        transaction.cost_price,
                                                    ),
                                                )}
                                            </span>
                                            <span className="whitespace-nowrap">
                                                Sale:{" "}
                                                {formatCurrency(
                                                    parseFloat(
                                                        transaction.selling_price,
                                                    ),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
