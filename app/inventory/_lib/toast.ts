// Toast functionality (since sonner might not be available)
export const toast = {
    success: (message: string) => console.log(`✅ ${message}`),
    error: (message: string) => console.error(`❌ ${message}`),
};
