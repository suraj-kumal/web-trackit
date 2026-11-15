// All landing page copy and sample data lives here.
// Sample numbers are internally consistent: in stock = bought - sold,
// profit = (selling price - cost price) x sold.

export const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Analytics", href: "#analytics" },
    { label: "How it works", href: "#how-it-works" },
];

export type LedgerFlag = "low" | "slow" | null;

export interface LedgerRow {
    item: string;
    bought: number;
    sold: number;
    profit: string;
    flag: LedgerFlag;
}

export const ledgerRows: LedgerRow[] = [
    { item: "Running shoes", bought: 120, sold: 84, profit: "Rs. 42,000", flag: null },
    { item: "Laptop sleeves", bought: 200, sold: 176, profit: "Rs. 26,400", flag: null },
    { item: "Wireless mouse", bought: 90, sold: 31, profit: "Rs. 9,300", flag: "slow" },
    { item: "Water bottles", bought: 300, sold: 289, profit: "Rs. 17,340", flag: "low" },
    { item: "Backpacks", bought: 60, sold: 42, profit: "Rs. 29,400", flag: null },
];

export const ledgerTotals = {
    bought: 770,
    sold: 622,
    inStock: 148,
    profit: "Rs. 1,24,440",
};

export const flagLabels = {
    low: "Low stock",
    slow: "Slow mover",
} as const;

export const features = [
    {
        title: "Inventory management",
        description:
            "Add, rename and delete items. Stock left updates from every purchase and sale you record.",
    },
    {
        title: "Transaction tracking",
        description:
            "Log quantity bought, quantity sold, cost price, selling price and date. Edit an entry whenever a number changes.",
    },
    {
        title: "Revenue analytics",
        description:
            "Total, weekly and monthly revenue, with daily averages and growth against last week.",
    },
    {
        title: "Profit and ROI",
        description:
            "Net profit, profit margin and return on investment, for the whole business and for each item.",
    },
    {
        title: "Item charts",
        description:
            "Price analysis, sales volume and purchase volume for each item, charted by date.",
    },
    {
        title: "Secure accounts",
        description:
            "Sign up, verify your email, log in, and reset a forgotten password. Each account keeps its own data.",
    },
];

export const metrics = [
    { term: "Total revenue", detail: "Everything you have sold so far." },
    { term: "Net profit", detail: "Revenue minus what the stock cost you." },
    { term: "Profit margin", detail: "Net profit as a share of revenue." },
    {
        term: "Return on investment",
        detail: "Profit earned for every rupee spent on stock.",
    },
    {
        term: "Weekly growth",
        detail: "This week's revenue compared with last week's.",
    },
    {
        term: "Daily averages",
        detail: "Revenue, profit and units sold per day.",
    },
    {
        term: "Top performing items",
        detail: "The items that earn you the most.",
    },
    {
        term: "Slow-moving items",
        detail: "The items that stay on the shelf.",
    },
];

export const unitsPerDay = [
    { day: "Mon", units: 38 },
    { day: "Tue", units: 52 },
    { day: "Wed", units: 45 },
    { day: "Thu", units: 70 },
    { day: "Fri", units: 61 },
    { day: "Sat", units: 88 },
    { day: "Sun", units: 74 },
];

export const steps = [
    {
        title: "Add your items",
        description:
            "Create each product you stock, from shoes to laptops.",
    },
    {
        title: "Record transactions",
        description:
            "Enter what you bought and sold, with prices and dates.",
    },
    {
        title: "Read the dashboard",
        description:
            "Revenue, profit, ROI and charts update from your records.",
    },
];
