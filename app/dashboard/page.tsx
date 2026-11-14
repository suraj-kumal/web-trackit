"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import type { ActiveNav } from "./_lib/types";
import { getUniqueItemIds } from "./_lib/selectors";
import { useDashboardData } from "./_hooks/useDashboardData";
import { useLogout } from "./_hooks/useLogout";
import { useOutsideSidebarClick } from "./_hooks/useOutsideSidebarClick";

import { LoadingScreen } from "./_components/LoadingScreen";
import { ErrorScreen } from "./_components/ErrorScreen";
import { Sidebar } from "./_components/Sidebar";
import { TopBar } from "./_components/TopBar";
import { DashboardOverview } from "./_components/DashboardOverview";
import { ItemAnalysis } from "./_components/ItemAnalysis";

export default function Home() {
    const router = useRouter();

    const { user, setUser, transactionData, items, isLoading, error } =
        useDashboardData();
    const { isLoggingOut, handleLogout } = useLogout(() => setUser(null));

    const [activeNav, setActiveNav] = useState<ActiveNav>("dashboard");
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
    useOutsideSidebarClick(isSidebarOpen, closeSidebar);

    const showDashboard = () => {
        setActiveNav("dashboard");
        setSelectedItemId(null);
        setIsSidebarOpen(false);
    };

    const showInventory = () => {
        setActiveNav("inventory");
        setSelectedItemId(null);
        setIsSidebarOpen(false);
        router.push("/inventory");
    };

    // Used by the "Top Performing Items" cards (sidebar state untouched)
    const showItem = (itemId: number) => {
        setActiveNav("item");
        setSelectedItemId(itemId);
    };

    // Used by the sidebar list (also closes the mobile sidebar)
    const showItemFromSidebar = (itemId: number) => {
        showItem(itemId);
        setIsSidebarOpen(false);
    };

    if (isLoading) return <LoadingScreen />;
    if (error) return <ErrorScreen message={error} />;

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    activeNav={activeNav}
                    selectedItemId={selectedItemId}
                    itemIds={getUniqueItemIds(transactionData)}
                    items={items}
                    onClose={closeSidebar}
                    onSelectDashboard={showDashboard}
                    onSelectInventory={showInventory}
                    onSelectItem={showItemFromSidebar}
                />

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <TopBar
                        user={user}
                        items={items}
                        selectedItemId={selectedItemId}
                        isLoggingOut={isLoggingOut}
                        onOpenSidebar={() => setIsSidebarOpen(true)}
                        onLogout={handleLogout}
                    />

                    {/* Content Area */}
                    <div className="p-4 lg:p-6">
                        <AnimatePresence mode="wait">
                            {activeNav === "item" && selectedItemId ? (
                                <ItemAnalysis
                                    key={`item-${selectedItemId}`}
                                    itemId={selectedItemId}
                                    items={items}
                                    transactionData={transactionData}
                                    onBack={showDashboard}
                                />
                            ) : (
                                <DashboardOverview
                                    key="dashboard"
                                    data={transactionData}
                                    items={items}
                                    onSelectItem={showItem}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
