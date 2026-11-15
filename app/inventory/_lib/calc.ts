import type { Transaction } from "./types";

export const getTransactionProfit = (transaction: Transaction) =>
    (parseFloat(transaction.selling_price) -
        parseFloat(transaction.cost_price)) *
    transaction.total_sell;
