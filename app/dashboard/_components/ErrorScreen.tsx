"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ErrorScreen({ message }: { message: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-6"
            >
                <p className="text-red-600 mb-4 text-sm md:text-base">
                    {message}
                </p>
                <Button onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </motion.div>
        </div>
    );
}
