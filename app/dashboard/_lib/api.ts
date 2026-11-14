import axios from "axios";
import type { useRouter } from "next/navigation";
import type { Item } from "./types";

type Router = ReturnType<typeof useRouter>;

const authHeaders = (token: string | null) => ({
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
});

const validateStatus = (status: number) => status >= 200 && status < 500;

// Fetch user data
export const fetchUser = async (router: Router) => {
    try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            router.push("/login");
            return null;
        }

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_B_URL}/api/user`,
            { headers: authHeaders(token), validateStatus },
        );

        if (response.data.message === "unauthenticated") {
            localStorage.removeItem("auth_token");
            router.push("/login");
            return null;
        }

        if (response.data.email_verified_at === null) {
            router.push("/verifyemail?sent=0");
            return null;
        }

        return response.data;
    } catch (error) {
        console.error("User fetch error:", error);
        localStorage.removeItem("auth_token");
        router.push("/login");
        return null;
    }
};

// Fetch transaction data
export const fetchTransactionData = async () => {
    try {
        const token = localStorage.getItem("auth_token");

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_B_URL}/api/transaction`,
            { headers: authHeaders(token), validateStatus },
        );

        if (response.data.success) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Transaction fetch error:", error);
        return null;
    }
};

// Fetch item details
export const fetchItem = async (itemId: number): Promise<Item | null> => {
    try {
        const token = localStorage.getItem("auth_token");

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_B_URL}/api/item/${itemId}`,
            { headers: authHeaders(token), validateStatus },
        );

        if (response.data.success) {
            return response.data.item;
        }
        return null;
    } catch (error) {
        console.error(`Item ${itemId} fetch error:`, error);
        return null;
    }
};

// Logout request (caller handles the response)
export const logoutRequest = (token: string) =>
    axios.post(
        `${process.env.NEXT_PUBLIC_B_URL}/api/logout`,
        {}, // no body required usually, send empty object
        { headers: authHeaders(token), validateStatus },
    );
