import type { TransactionForm } from "./types";

export const getEmptyTransactionForm = (): TransactionForm => ({
    item_id: "",
    total_buy: "",
    total_sell: "",
    cost_price: "",
    selling_price: "",
    transaction_date: new Date().toISOString().split("T")[0],
});
