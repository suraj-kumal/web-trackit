"use client";

import { motion } from "framer-motion";
import { features } from "../_lib/content";
import { fadeUp, stagger, viewport } from "../_lib/motion";
import { grid12 } from "../_lib/styles";
import { SectionShell } from "./SectionShell";

export function Features() {
    return (
        <SectionShell
            id="features"
            title="Features"
            statement="Stock, sales and profit in one system, without the spreadsheet."
        >
            <motion.ul
                className="border-t-2 border-border"
                variants={stagger(0.09)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
            >
                {features.map((feature) => (
                    <motion.li
                        key={feature.title}
                        variants={fadeUp}
                        className={`${grid12} group border-b border-border py-6 sm:py-8`}
                    >
                        <h3 className="col-span-12 text-xl font-bold transition-transform duration-200 group-hover:translate-x-2 sm:text-2xl md:col-span-5">
                            {feature.title}
                        </h3>
                        <p className="col-span-12 mt-2 max-w-[55ch] text-lg text-muted-foreground transition-colors duration-200 group-hover:text-foreground md:col-span-7 md:mt-0">
                            {feature.description}
                        </p>
                    </motion.li>
                ))}
            </motion.ul>
        </SectionShell>
    );
}
