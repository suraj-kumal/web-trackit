export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
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

export interface ItemPerformance {
    item_id: number;
    profit: number;
    revenue: number;
    sales_volume: number;
    stock_left: number;
    profit_margin: number;
}

export interface TransactionData {
    success: boolean;
    transaction: Transaction[];
    total_sell: number;
    stock_left: number;
    revenue: number;
    total_net_profit: number;
    average_profit_per_sale: number;
    profit_margin_percent: number;
    return_on_investment_percent: number;
    total_investment: number;
    this_week_revenue: number;
    this_week_net_profit: number;
    weekly_sales_volume: number;
    weekly_profit_margin_percent: number;
    weekly_growth_rate_percent: number;
    avg_daily_revenue: number;
    avg_daily_profit: number;
    avg_daily_sales: number;
    this_month_revenue: number;
    this_month_net_profit: number;
    monthly_sales_volume: number;
    monthly_profit_margin_percent: number;
    monthly_growth_rate_percent: number;
    avg_monthly_daily_revenue: number;
    avg_monthly_daily_profit: number;
    avg_monthly_daily_sales: number;
    item_performance: ItemPerformance[];
    top_performing_items: ItemPerformance[];
    slow_moving_items: ItemPerformance[];
}

export interface Item {
    id: number;
    name: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface ItemChartData {
    date: string;
    costPrice: number;
    sellingPrice: number;
    totalBuy: number;
    totalSell: number;
}

export type ActiveNav = "dashboard" | "inventory" | "item";
