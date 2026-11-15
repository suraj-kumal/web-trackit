"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/modeToggle";
import { useAuthToken } from "../_hooks/useAuthToken";
import { navLinks } from "../_lib/content";
import { container } from "../_lib/styles";
import { Logo } from "./Logo";

export function Navbar() {
    const hasAuthToken = useAuthToken();

    return (
        <header className="sticky top-0 z-50 border-b-2 border-border bg-background">
            <div
                className={`${container} flex h-16 items-center justify-between gap-4`}
            >
                <Logo />

                <nav aria-label="Primary" className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="font-medium underline-offset-4 hover:text-accent hover:underline"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-2 sm:gap-3">
                    <ModeToggle />
                    {hasAuthToken ? (
                        <Button
                            asChild
                            className="border-2 border-border font-bold"
                        >
                            <Link href="/dashboard">
                                <span className="hidden sm:inline">
                                    Go to dashboard
                                </span>
                                <span className="sm:hidden">Dashboard</span>
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button
                                asChild
                                variant="ghost"
                                className="font-bold"
                            >
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button
                                asChild
                                className="border-2 border-border font-bold"
                            >
                                <Link href="/signup">Sign up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
