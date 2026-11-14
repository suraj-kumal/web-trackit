"use client";

import type { ReactNode } from "react";
import { motion, easeOut } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardVariants } from "../_lib/variants";

interface MetricCardProps {
    title: string;
    icon: LucideIcon;
    value: ReactNode;
    footer: ReactNode;
}

export function MetricCard({
    title,
    icon: Icon,
    value,
    footer,
}: MetricCardProps) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -2 }}
            transition={{ ease: easeOut }}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium">
                        {title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-xl lg:text-2xl font-bold">{value}</div>
                    {footer}
                </CardContent>
            </Card>
        </motion.div>
    );
}
