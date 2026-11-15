export interface Item {
    id: number;
    name: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    item_id: number;
    total_buy: number;
    total_sell: number;
    cost_price: string;
    selling_price: string;
    transaction_date: string;
    created_at: string;
    updated_at: string;
}

export interface ItemForm {
    name: string;
}

export interface TransactionForm {
    item_id: string;
    total_buy: string;
    total_sell: string;
    cost_price: string;
    selling_price: string;
    transaction_date: string;
}
