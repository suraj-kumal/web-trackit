"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "../_lib/toast";
import type { Item, Transaction, TransactionForm } from "../_lib/types";

export function useInventoryData() {
    const router = useRouter();

    // State management
    const [items, setItems] = useState<Item[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<
        Transaction[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [transactionSearchTerm, setTransactionSearchTerm] = useState("");

    // Authentication helper
    const getAuthHeaders = () => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            router.push("/login");
            return null;
        }
        return {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        };
    };

    // API Functions
    const fetchItems = async () => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_B_URL}/api/item`,
                { headers },
            );

            if (response.data.items) {
                setItems(response.data.items);
                setFilteredItems(response.data.items);
            }
        } catch (error) {
            console.error("Failed to fetch items:", error);
            toast.error("Failed to fetch items");
        }
    };

    const fetchTransactions = async () => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_B_URL}/api/transaction`,
                { headers },
            );

            if (response.data.success && response.data.transaction) {
                setTransactions(response.data.transaction);
                setFilteredTransactions(response.data.transaction);
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            toast.error("Failed to fetch transactions");
        }
    };

    // `onSuccess` runs exactly where the dialog/form reset used to run
    const createItem = async (name: string, onSuccess: () => void) => {
        try {
            setIsSubmitting(true);
            const headers = getAuthHeaders();
            if (!headers) return;

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_B_URL}/api/item`,
                { name },
                { headers },
            );

            if (response.data.success) {
                toast.success("Item created successfully!");
                await fetchItems();
                onSuccess();
            }
        } catch (error: any) {
            console.error("Failed to create item:", error);
            toast.error(error.response?.data?.error || "Failed to create item");
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateItem = async (
        id: number,
        name: string,
        onSuccess: () => void,
    ) => {
        try {
            setIsSubmitting(true);
            const headers = getAuthHeaders();
            if (!headers) return;

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_B_URL}/api/item/${id}`,
                { name },
                { headers },
            );

            if (response.data.success) {
                toast.success("Item updated successfully!");
                await fetchItems();
                onSuccess();
            }
        } catch (error: any) {
            console.error("Failed to update item:", error);
            toast.error(error.response?.data?.error || "Failed to update item");
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;

            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_B_URL}/api/item/${id}`,
                { headers },
            );

            if (response.data.success) {
                toast.success("Item deleted successfully!");
                await fetchItems();
                await fetchTransactions();
            }
        } catch (error: any) {
            console.error("Failed to delete item:", error);
            toast.error(error.response?.data?.error || "Failed to delete item");
        }
    };

    const createTransaction = async (
        data: TransactionForm,
        onSuccess: () => void,
    ) => {
        try {
            setIsSubmitting(true);
            const headers = getAuthHeaders();
            if (!headers) return;

            const payload = {
                item_id: parseInt(data.item_id),
                total_buy: parseInt(data.total_buy),
                total_sell: parseInt(data.total_sell),
                cost_price: parseFloat(data.cost_price),
                selling_price: parseFloat(data.selling_price),
                transaction_date: data.transaction_date,
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_B_URL}/api/transaction`,
                payload,
                { headers },
            );

            if (response.data.success) {
                toast.success("Transaction created successfully!");
                await fetchTransactions();
                onSuccess();
            }
        } catch (error: any) {
            console.error("Failed to create transaction:", error);
            toast.error(
                error.response?.data?.error || "Failed to create transaction",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateTransaction = async (
        id: number,
        data: TransactionForm,
        onSuccess: () => void,
    ) => {
        try {
            setIsSubmitting(true);
            const headers = getAuthHeaders();
            if (!headers) return;

            const payload = {
                total_buy: parseInt(data.total_buy),
                total_sell: parseInt(data.total_sell),
                cost_price: parseFloat(data.cost_price),
                selling_price: parseFloat(data.selling_price),
                transaction_date: data.transaction_date,
            };

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_B_URL}/api/transaction/${id}`,
                payload,
                { headers },
            );

            if (response.data.success) {
                toast.success("Transaction updated successfully!");
                await fetchTransactions();
                onSuccess();
            }
        } catch (error: any) {
            console.error("Failed to update transaction:", error);
            toast.error(
                error.response?.data?.error || "Failed to update transaction",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await Promise.all([fetchItems(), fetchTransactions()]);
            setIsLoading(false);
        };
        loadData();
    }, []);

    // Filter items
    useEffect(() => {
        let filtered = items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredItems(filtered);
    }, [items, searchTerm]);

    // Filter transactions (newest date first; same-day ties: higher id first)
    useEffect(() => {
        let filtered = transactions
            .filter((transaction) => {
                const item = items.find(
                    (item) => item.id === transaction.item_id,
                );
                return item?.name
                    .toLowerCase()
                    .includes(transactionSearchTerm.toLowerCase());
            })
            .sort(
                (a, b) =>
                    new Date(b.transaction_date).getTime() -
                        new Date(a.transaction_date).getTime() || b.id - a.id,
            );
        setFilteredTransactions(filtered);
    }, [transactions, transactionSearchTerm, items]);

    // Get item name by ID
    const getItemName = (itemId: number) => {
        const item = items.find((item) => item.id === itemId);
        return item?.name || `Item ${itemId}`;
    };

    return {
        items,
        transactions,
        filteredItems,
        filteredTransactions,
        isLoading,
        isSubmitting,
        searchTerm,
        setSearchTerm,
        transactionSearchTerm,
        setTransactionSearchTerm,
        getItemName,
        createItem,
        updateItem,
        deleteItem,
        createTransaction,
        updateTransaction,
    };
}
