// Format currency
export const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat("ne-NP", {
        style: "currency",
        currency: "NPR",
    }).format(amount);
    return formatted.replace("नेरू", "Rs.");
};

// Format date
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
