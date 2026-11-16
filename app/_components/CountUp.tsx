"use client";

import { useEffect } from "react";
import {
    animate,
    easeOut,
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "framer-motion";

interface CountUpProps {
    to: number;
    prefix?: string;
    delay?: number;
    duration?: number;
    className?: string;
}

/** Counts from 0 to `to` once. Numbers use Indian digit grouping (1,24,440). */
export function CountUp({
    to,
    prefix = "",
    delay = 0,
    duration = 1,
    className,
}: CountUpProps) {
    const reduceMotion = useReducedMotion();
    // Always start at 0 so server and client render the same first frame
    const value = useMotionValue(0);
    const text = useTransform(
        value,
        (v) => prefix + Math.round(v).toLocaleString("en-IN"),
    );

    useEffect(() => {
        if (reduceMotion) {
            value.set(to);
            return;
        }
        const controls = animate(value, to, {
            duration,
            delay,
            ease: easeOut,
        });
        return () => controls.stop();
    }, [to, delay, duration, reduceMotion, value]);

    return <motion.span className={className}>{text}</motion.span>;
}
