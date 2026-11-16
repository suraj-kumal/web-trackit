"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { stagger, viewport, wordRise } from "../_lib/motion";
import { bricolage } from "../_lib/fonts";

interface AnimatedWordsProps {
    text: string;
    as?: "h1" | "h2" | "p";
    className?: string;
    /** Play on scroll instead of on mount */
    onView?: boolean;
    delay?: number;
}

/**
 * Headline reveal: each word rises out from behind its own line, staggered.
 * The real text stays on the heading via aria-label for screen readers.
 */
export function AnimatedWords({
    text,
    as: Tag = "h1",
    className,
    onView = false,
    delay = 0,
}: AnimatedWordsProps) {
    const words = text.split(" ");

    return (
        <Tag className={className} aria-label={text}>
            <motion.span
                aria-hidden="true"
                className={`${bricolage.className} block`}
                variants={stagger(0.05, delay)}
                initial="hidden"
                {...(onView
                    ? { whileInView: "visible", viewport }
                    : { animate: "visible" })}
            >
                {words.map((word, i) => (
                    <Fragment key={`${word}-${i}`}>
                        {/* the clip box; padding + negative margin keep ascenders and descenders from being cut */}
                        <span className="my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom">
                            <motion.span
                                className="inline-block"
                                variants={wordRise}
                            >
                                {word}
                            </motion.span>
                        </span>
                        {i < words.length - 1 && " "}
                    </Fragment>
                ))}
            </motion.span>
        </Tag>
    );
}
