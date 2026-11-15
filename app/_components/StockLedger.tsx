"use client";

import { motion, easeOut } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { flagLabels, ledgerRows, ledgerTotals } from "../_lib/content";

const headCell = "px-3 py-3 font-bold sm:px-5";
const numCell =
    "whitespace-nowrap px-3 py-4 text-right font-mono text-xs font-bold sm:px-5 sm:text-base";

/**
 * The hero. A stock ledger, filled in once on load: rows enter in sequence
 * and each in-stock bar grows. This is the page's only entrance animation.
 */
export function StockLedger() {
    return (
        <figure className="col-span-12 mt-12 lg:mt-16">
            <div className="overflow-x-auto border-2 border-border bg-card shadow-[8px_8px_0_0_var(--foreground)]">
                <table className="w-full text-left text-sm sm:text-base">
                    <caption className="sr-only">
                        Sample stock ledger: items bought, sold, in stock and
                        profit
                    </caption>
                    <thead>
                        <tr className="bg-foreground text-background">
                            <th scope="col" className={headCell}>
                                Item
                            </th>
                            <th
                                scope="col"
                                className={`${headCell} hidden text-right sm:table-cell`}
                            >
                                Bought
                            </th>
                            <th
                                scope="col"
                                className={`${headCell} hidden text-right sm:table-cell`}
                            >
                                Sold
                            </th>
                            <th scope="col" className={`${headCell} sm:w-[38%]`}>
                                In stock
                            </th>
                            <th scope="col" className={`${headCell} text-right`}>
                                Profit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledgerRows.map((row, i) => {
                            const inStock = row.bought - row.sold;
                            const share = (inStock / row.bought) * 100;
                            const delay = 0.25 + i * 0.12;

                            return (
                                <motion.tr
                                    key={row.item}
                                    className="border-b border-border"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.35,
                                        delay,
                                        ease: easeOut,
                                    }}
                                >
                                    <th
                                        scope="row"
                                        className="px-3 py-4 font-bold sm:px-5"
                                    >
                                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            {row.item}
                                            {row.flag && (
                                                <Badge
                                                    className={`border-2 border-border text-xs font-bold ${
                                                        row.flag === "low"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-secondary text-secondary-foreground"
                                                    }`}
                                                >
                                                    {flagLabels[row.flag]}
                                                </Badge>
                                            )}
                                        </span>
                                    </th>
                                    <td
                                        className={`${numCell} hidden sm:table-cell`}
                                    >
                                        {row.bought}
                                    </td>
                                    <td
                                        className={`${numCell} hidden sm:table-cell`}
                                    >
                                        {row.sold}
                                    </td>
                                    <td className="px-3 py-4 sm:px-5">
                                        <span className="flex items-center gap-3">
                                            <span className="w-9 text-right font-mono font-bold">
                                                {inStock}
                                            </span>
                                            <span className="h-4 min-w-10 flex-1 border-2 border-border bg-background">
                                                <motion.span
                                                    aria-hidden="true"
                                                    className={`block h-full origin-left ${
                                                        row.flag === "low"
                                                            ? "bg-primary"
                                                            : "bg-foreground"
                                                    }`}
                                                    style={{
                                                        width: `${share}%`,
                                                    }}
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: delay + 0.15,
                                                        ease: easeOut,
                                                    }}
                                                />
                                            </span>
                                        </span>
                                    </td>
                                    <td className={numCell}>{row.profit}</td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="bg-secondary text-secondary-foreground">
                            <th scope="row" className="px-3 py-4 font-bold sm:px-5">
                                Total
                            </th>
                            <td className={`${numCell} hidden sm:table-cell`}>
                                {ledgerTotals.bought}
                            </td>
                            <td className={`${numCell} hidden sm:table-cell`}>
                                {ledgerTotals.sold}
                            </td>
                            <td className="px-3 py-4 sm:px-5">
                                <span className="font-mono font-bold">
                                    {ledgerTotals.inStock}
                                </span>
                            </td>
                            <td className={numCell}>{ledgerTotals.profit}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <figcaption className="mt-5 max-w-[60ch] text-sm text-muted-foreground">
                Sample data. WhereStock builds this view from the items and
                transactions you record.
            </figcaption>
        </figure>
    );
}
