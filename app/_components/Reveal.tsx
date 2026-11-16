"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "../_lib/motion";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    /** Play on mount instead of on scroll (for content above the fold) */
    onMount?: boolean;
}

/** Fade + rise, once. */
export function Reveal({
    children,
    className,
    delay = 0,
    onMount = false,
}: RevealProps) {
    return (
        <motion.div
            className={className}
            variants={fadeUp}
            initial="hidden"
            {...(onMount
                ? { animate: "visible" }
                : { whileInView: "visible", viewport })}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}
