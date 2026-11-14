export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
};

export const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat("ne-NP", {
        style: "currency",
        currency: "NPR",
    }).format(amount);
    return formatted.replace("नेरू", "Rs.");
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};
