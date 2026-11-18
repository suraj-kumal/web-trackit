import type { Item, ItemPerformance, Transaction } from "./types";
import { getItemName } from "./selectors";

const download = (csv: string, filename: string) => {
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

const cell = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Downloads all transactions (newest first) as a CSV file. */
export function exportTransactionsCsv(
    transactions: Transaction[],
    items: Record<number, Item>,
) {
    const header = [
        "Date",
        "Item",
        "Bought",
        "Sold",
        "Cost price",
        "Selling price",
        "Revenue",
        "Profit",
    ];

    const rows = [...transactions]
        .sort(
            (a, b) =>
                new Date(b.transaction_date).getTime() -
                    new Date(a.transaction_date).getTime() || b.id - a.id,
        )
        .map((t) => {
            const cost = Number(t.cost_price);
            const price = Number(t.selling_price);
            return [
                t.transaction_date.slice(0, 10),
                getItemName(items, t.item_id),
                t.total_buy,
                t.total_sell,
                cost,
                price,
                t.total_sell * price,
                t.total_sell * (price - cost),
            ];
        });

    const csv = [header, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    download(csv, `transactions-${new Date().toISOString().slice(0, 10)}.csv`);
}

const byNewest = (a: Transaction, b: Transaction) =>
    new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime() || b.id - a.id;

/**
 * One file for one item: a summary block on top, a blank line, then every
 * transaction of that item (newest first). Totals are computed from the
 * transactions so they always match the rows below.
 */
export function exportItemCsv(
    itemName: string,
    transactions: Transaction[],
    performance?: ItemPerformance | null,
) {
    const rows = transactions.map((t) => {
        const cost = Number(t.cost_price);
        const price = Number(t.selling_price);
        return {
            t,
            revenue: t.total_sell * price,
            profit: t.total_sell * (price - cost),
        };
    });

    const bought = rows.reduce((n, r) => n + r.t.total_buy, 0);
    const sold = rows.reduce((n, r) => n + r.t.total_sell, 0);
    const revenue = rows.reduce((n, r) => n + r.revenue, 0);
    const profit = rows.reduce((n, r) => n + r.profit, 0);

    const summary: (string | number)[][] = [
        ["Item", itemName],
        ["Units bought", bought],
        ["Units sold", sold],
        ["Stock left", bought - sold],
        ["Revenue", revenue],
        ["Profit", profit],
        ["Profit margin %", revenue > 0 ? ((profit / revenue) * 100).toFixed(2) : 0],
    ];
    if (performance?.stock_value != null)
        summary.push(["Stock value at cost", performance.stock_value]);
    if (performance?.days_of_stock_left != null)
        summary.push(["Days of stock left", performance.days_of_stock_left]);

    const table: (string | number)[][] = [
        ["Date", "Bought", "Sold", "Cost price", "Selling price", "Revenue", "Profit"],
        ...[...transactions]
            .sort(byNewest)
            .map((t) => {
                const cost = Number(t.cost_price);
                const price = Number(t.selling_price);
                return [
                    t.transaction_date.slice(0, 10),
                    t.total_buy,
                    t.total_sell,
                    cost,
                    price,
                    t.total_sell * price,
                    t.total_sell * (price - cost),
                ];
            }),
    ];

    const csv = [...summary, [], ...table]
        .map((r) => r.map(cell).join(","))
        .join("\n");

    const slug =
        itemName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
        "item";
    download(csv, `${slug}-${new Date().toISOString().slice(0, 10)}.csv`);
}
