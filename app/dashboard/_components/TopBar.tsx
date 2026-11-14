"use client";

import { Loader2, Menu } from "lucide-react";
import { ModeToggle } from "@/app/components/modeToggle";
import { Button } from "@/components/ui/button";
import type { Item, User } from "../_lib/types";
import { getGreeting } from "../_lib/format";
import { getItemName } from "../_lib/selectors";

interface TopBarProps {
    user: User | null;
    items: Record<number, Item>;
    selectedItemId: number | null;
    isLoggingOut: boolean;
    onOpenSidebar: () => void;
    onLogout: () => void;
}

export function TopBar({
    user,
    items,
    selectedItemId,
    isLoggingOut,
    onOpenSidebar,
    onLogout,
}: TopBarProps) {
    return (
        <header className="bg-card shadow-sm px-4 lg:px-6 py-4 flex justify-between items-center border-b">
            <div className="flex items-center gap-4">
                <Button
                    id="menu-button"
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={onOpenSidebar}
                >
                    <Menu className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-lg lg:text-2xl font-bold text-foreground">
                        {selectedItemId ? (
                            <>
                                <span className="block lg:inline">
                                    Analysis:
                                </span>{" "}
                                <span className="block lg:inline">
                                    {getItemName(items, selectedItemId)}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="block lg:inline">
                                    {getGreeting()}!
                                </span>{" "}
                                <span className="block lg:inline">
                                    {user?.name}
                                </span>
                            </>
                        )}
                    </h1>

                    <p className="text-muted-foreground text-xs lg:text-sm">
                        {selectedItemId
                            ? "Detailed performance metrics and charts"
                            : "Welcome back to TrackIt"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
                <ModeToggle />
                <Button
                    size="sm"
                    onClick={onLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 cursor-pointer text-xs lg:text-sm"
                >
                    {isLoggingOut ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    Logout
                </Button>
            </div>
        </header>
    );
}
