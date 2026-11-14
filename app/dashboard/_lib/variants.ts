import { easeOut, type Variants } from "framer-motion";

// Parent: passes "hidden" -> "visible" down to every child that has `variants`,
// and staggers them. Used by the dashboard overview and the metrics grid.
export const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05,
        },
    },
};

// Cards / sections: short fade + small rise.
export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: easeOut,
        },
    },
};

// Metric cards: soft fade + slight scale.
export const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: easeOut,
        },
    },
};

// Item detail view: container fades up, its sections stagger in after it.
export const itemViewVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: easeOut,
            delayChildren: 0.1,
            staggerChildren: 0.07,
        },
    },
};
