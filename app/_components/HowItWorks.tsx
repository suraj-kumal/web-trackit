"use client";

import { motion } from "framer-motion";
import { steps } from "../_lib/content";
import { fadeUp, stagger, viewport } from "../_lib/motion";
import { SectionShell } from "./SectionShell";

export function HowItWorks() {
    return (
        <SectionShell
            id="how-it-works"
            title="How it works"
            statement="Three steps from an empty account to a working dashboard."
        >
            <motion.ol
                className="grid gap-x-8 gap-y-10 md:grid-cols-3"
                variants={stagger(0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
            >
                {steps.map((step, index) => (
                    <motion.li
                        key={step.title}
                        variants={fadeUp}
                        className="border-t-2 border-border pt-4"
                    >
                        <span
                            aria-hidden="true"
                            className="block font-mono text-6xl font-bold leading-none sm:text-7xl"
                        >
                            {index + 1}
                        </span>
                        <h3 className="mt-6 text-2xl font-bold">
                            {step.title}
                        </h3>
                        <p className="mt-2 max-w-[34ch] text-lg text-muted-foreground">
                            {step.description}
                        </p>
                    </motion.li>
                ))}
            </motion.ol>
        </SectionShell>
    );
}
