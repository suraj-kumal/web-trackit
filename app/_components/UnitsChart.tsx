"use client";

import { motion, easeOut } from "framer-motion";
import { unitsPerDay } from "../_lib/content";

const max = Math.max(...unitsPerDay.map((d) => d.units));

/** Sample bar chart. Bars grow once when scrolled into view. */
export function UnitsChart() {
    return (
        <figure className="border-2 border-secondary-foreground bg-background p-5 text-foreground shadow-[6px_6px_0_0_var(--secondary-foreground)] sm:p-8">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xl font-bold">Units sold per day</span>
                <span className="text-sm text-muted-foreground">
                    Sample data
                </span>
            </figcaption>

            <div
                role="img"
                aria-label={`Bar chart of units sold per day: ${unitsPerDay
                    .map((d) => `${d.day} ${d.units}`)
                    .join(", ")}`}
                className="mt-6"
            >
                <div className="flex h-56 items-end gap-2 border-b-2 border-foreground sm:gap-4">
                    {unitsPerDay.map((d, i) => (
                        <div
                            key={d.day}
                            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                        >
                            <span className="font-mono text-xs font-bold sm:text-sm">
                                {d.units}
                            </span>
                            <motion.div
                                className="w-full origin-bottom border-2 border-b-0 border-foreground bg-primary"
                                style={{ height: `${(d.units / max) * 82}%` }}
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.45,
                                    delay: i * 0.06,
                                    ease: easeOut,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-2 flex gap-2 sm:gap-4">
                    {unitsPerDay.map((d) => (
                        <span
                            key={d.day}
                            className="flex-1 text-center text-sm text-muted-foreground"
                        >
                            {d.day}
                        </span>
                    ))}
                </div>
            </div>
        </figure>
    );
}
