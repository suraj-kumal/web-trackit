"use client";

import { useEffect, useState } from "react";

/**
 * Reads the auth token after mount so server and client render the same
 * markup first (avoids a hydration mismatch).
 */
export function useAuthToken() {
    const [hasAuthToken, setHasAuthToken] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        setHasAuthToken(!!token);
    }, []);

    return hasAuthToken;
}
