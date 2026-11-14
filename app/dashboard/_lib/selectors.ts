import type {
    Item,
    ItemChartData,
    ItemPerformance,
    TransactionData,
} from "./types";

export const getItemName = (items: Record<number, Item>, itemId: number) =>
    items[itemId]?.name || `Item ${itemId}`;

export const prepareItemChartData = (
    transactionData: TransactionData | null,
    itemId: number,
): ItemChartData[] => {
    if (!transactionData) return [];

    const itemTransactions = transactionData.transaction
        .filter((t) => t.item_id === itemId)
        .sort(
            (a, b) =>
                new Date(a.transaction_date).getTime() -
                new Date(b.transaction_date).getTime(),
        );

    return itemTransactions.map((transaction) => ({
        date: transaction.transaction_date,
        costPrice: parseFloat(transaction.cost_price),
        sellingPrice: parseFloat(transaction.selling_price),
        totalBuy: transaction.total_buy,
        totalSell: transaction.total_sell,
    }));
};

export const getUniqueItemIds = (
    transactionData: TransactionData | null,
): number[] => {
    if (!transactionData) return [];
    return [...new Set(transactionData.transaction.map((t) => t.item_id))];
};

export const getItemPerformance = (
    transactionData: TransactionData | null,
    itemId: number,
): ItemPerformance | null => {
    if (!transactionData) return null;
    return (
        transactionData.item_performance.find(
            (item) => item.item_id === itemId,
        ) || null
    );
};
