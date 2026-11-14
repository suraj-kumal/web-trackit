"use client";

import { useEffect } from "react";

export function useOutsideSidebarClick(isOpen: boolean, onClose: () => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById("sidebar");
            const menuButton = document.getElementById("menu-button");

            if (
                sidebar &&
                !sidebar.contains(event.target as Node) &&
                menuButton &&
                !menuButton.contains(event.target as Node) &&
                isOpen
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);
}
