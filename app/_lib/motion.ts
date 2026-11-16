import { easeOut, type Variants } from "framer-motion";

// Shared animation vocabulary for the landing page.
// Everything below the hero plays once, when it scrolls into view.

export const viewport = { once: true, margin: "-80px" } as const;

/** Parent variant: staggers its children (children use `fadeUp`). */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
});

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeOut },
    },
};

/** A word rising out from behind its own line (used by AnimatedWords). */
export const wordRise: Variants = {
    hidden: { y: "110%" },
    visible: {
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};
