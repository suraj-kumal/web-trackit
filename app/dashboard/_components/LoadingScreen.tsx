"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
            >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm md:text-lg">Loading dashboard...</span>
            </motion.div>
        </div>
    );
}
