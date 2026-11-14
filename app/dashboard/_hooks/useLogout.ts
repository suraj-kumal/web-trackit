"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutRequest } from "../_lib/api";

export function useLogout(onLoggedOut: () => void) {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            // nothing to do — force redirect
            router.push("/login");
            return;
        }

        try {
            setIsLoggingOut(true);

            // send POST to logout endpoint with Authorization header
            const resp = await logoutRequest(token);

            if (resp.status === 200 || resp.data?.success) {
                localStorage.removeItem("auth_token");
                onLoggedOut();
                router.push("/login");
                return;
            }

            console.warn("Logout failed:", resp.data || resp.status);

            localStorage.removeItem("auth_token");
            router.push("/login");
        } catch (err) {
            console.error("Logout error:", err);

            localStorage.removeItem("auth_token");
            router.push("/login");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return { isLoggingOut, handleLogout };
}
