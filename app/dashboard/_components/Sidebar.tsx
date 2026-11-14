"use client";

import Link from "next/link";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import {
    BarChart3,
    ExternalLink,
    LayoutDashboard,
    Package,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActiveNav, Item } from "../_lib/types";
import { SidebarItemList } from "./SidebarItemList";

interface SidebarProps {
    isOpen: boolean;
    activeNav: ActiveNav;
    selectedItemId: number | null;
    itemIds: number[];
    items: Record<number, Item>;
    onClose: () => void;
    onSelectDashboard: () => void;
    onSelectInventory: () => void;
    onSelectItem: (itemId: number) => void;
}

export function Sidebar({
    isOpen,
    activeNav,
    selectedItemId,
    itemIds,
    items,
    onClose,
    onSelectDashboard,
    onSelectInventory,
    onSelectItem,
}: SidebarProps) {
    return (
        <>
            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`
            fixed lg:static top-0 left-0 z-50 lg:z-auto
            w-64 bg-card shadow-lg min-h-screen border-r overflow-y-auto
            transition-transform duration-300 ease-in-out lg:transition-none
            ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
            >
                <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-6 lg:mb-8">
                        <Link href="/">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-background" />
                                </div>
                                <span className="font-bold text-lg lg:text-xl">
                                    Track It
                                </span>
                            </div>
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={onClose}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <nav className="space-y-2">
                        <motion.button
                            onClick={onSelectDashboard}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-sm ${
                                activeNav === "dashboard"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                            whileHover={{
                                x: activeNav !== "dashboard" ? 4 : 0,
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ ease: easeOut }}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                        </motion.button>

                        <motion.button
                            onClick={onSelectInventory}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground text-sm"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ ease: easeOut }}
                        >
                            <Package className="w-5 h-5" />
                            Inventory
                            <ExternalLink className="w-3 h-3 ml-auto" />
                        </motion.button>

                        {/* Items Section */}
                        <SidebarItemList
                            itemIds={itemIds}
                            items={items}
                            selectedItemId={selectedItemId}
                            onSelectItem={onSelectItem}
                        />
                    </nav>
                </div>
            </aside>
        </>
    );
}
