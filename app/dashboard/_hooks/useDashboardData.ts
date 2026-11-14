"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchItem, fetchTransactionData, fetchUser } from "../_lib/api";
import type {
    Item,
    ItemPerformance,
    Transaction,
    TransactionData,
    User,
} from "../_lib/types";

export function useDashboardData() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [transactionData, setTransactionData] =
        useState<TransactionData | null>(null);
    const [items, setItems] = useState<Record<number, Item>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // React Strict Mode (dev only) runs effects twice on mount, which fired
    // every request twice. This ref survives that simulated remount, so the
    // load only ever starts once.
    const hasFetched = useRef(false);

    // Load all data on page load
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const loadData = async () => {
            setIsLoading(true);
            setError("");

            try {
                // Fetch user first
                const userData = await fetchUser(router);
                if (!userData) return;

                setUser(userData);

                // Fetch transaction data
                const transData = await fetchTransactionData();
                if (transData) {
                    setTransactionData(transData);

                    const itemIds = new Set<number>();
                    transData.transaction.forEach((t: Transaction) =>
                        itemIds.add(t.item_id),
                    );
                    transData.item_performance.forEach(
                        (item: ItemPerformance) => itemIds.add(item.item_id),
                    );

                    // Fetch all items
                    const itemsData: Record<number, Item> = {};
                    await Promise.all(
                        Array.from(itemIds).map(async (itemId) => {
                            const item = await fetchItem(itemId);
                            if (item) {
                                itemsData[itemId] = item;
                            }
                        }),
                    );
                    setItems(itemsData);
                }
            } catch (error) {
                console.error("Data loading error:", error);
                setError("Failed to load dashboard data");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user, setUser, transactionData, items, isLoading, error };
}
