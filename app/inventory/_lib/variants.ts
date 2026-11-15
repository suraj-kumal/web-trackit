import { easeOut, type Variants } from "framer-motion";

// Animation variants
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, staggerChildren: 0.1, ease: easeOut },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};
