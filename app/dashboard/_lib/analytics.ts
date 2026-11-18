import type { Transaction, TransactionData, ItemPerformance } from "./types";

export type TrendRange = 7 | 30 | 90 | "all";

export interface TrendPoint {
    date: string; // YYYY-MM-DD
    revenue: number;
    profit: number;
    units: number; // units sold
}

const dayKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate(),
    ).padStart(2, "0")}`;

const num = (v: string | number) => Number(v) || 0;

/** Daily revenue and profit, with empty days filled in as zero. */
export function buildTrendSeries(
    transactions: Transaction[] | undefined,
    range: TrendRange,
): TrendPoint[] {
    if (!transactions || transactions.length === 0) return [];

    const byDay = new Map<string, TrendPoint>();
    for (const t of transactions) {
        const key = t.transaction_date.slice(0, 10);
        const revenue = t.total_sell * num(t.selling_price);
        const profit = t.total_sell * (num(t.selling_price) - num(t.cost_price));
        const point = byDay.get(key) ?? { date: key, revenue: 0, profit: 0, units: 0 };
        point.revenue += revenue;
        point.profit += profit;
        point.units += t.total_sell;
        byDay.set(key, point);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let start: Date;
    if (range === "all") {
        const first = [...byDay.keys()].sort()[0];
        const [y, m, d] = first.split("-").map(Number);
        start = new Date(y, m - 1, d);
    } else {
        start = new Date(today);
        start.setDate(start.getDate() - (range - 1));
    }

    const series: TrendPoint[] = [];
    for (const d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        const key = dayKey(d);
        series.push(byDay.get(key) ?? { date: key, revenue: 0, profit: 0, units: 0 });
    }
    return series;
}

/** Sales recorded at a selling price below the cost price. */
export function findBelowCostSales(
    transactions: Transaction[] | undefined,
): Transaction[] {
    return (transactions ?? []).filter(
        (t) => t.total_sell > 0 && num(t.selling_price) < num(t.cost_price),
    );
}

export interface StockHealthData {
    stockValue: number | null;
    runningLow: ItemPerformance[]; // sorted by fewest days left
    notSelling: ItemPerformance[]; // stock but zero sales
}

const LOW_STOCK_DAYS = 14;

export function getStockHealth(data: TransactionData | null): StockHealthData {
    const perf = data?.item_performance ?? [];
    return {
        stockValue: data?.stock_value ?? null,
        runningLow: perf
            .filter(
                (i) =>
                    i.days_of_stock_left != null &&
                    i.days_of_stock_left <= LOW_STOCK_DAYS,
            )
            .sort((a, b) => a.days_of_stock_left! - b.days_of_stock_left!),
        notSelling: data?.slow_moving_items ?? [],
    };
}
