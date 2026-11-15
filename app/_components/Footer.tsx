import Link from "next/link";
import { container, grid12 } from "../_lib/styles";
import { Logo } from "./Logo";

export function Footer() {
    return (
        <footer className="border-t-2 border-border">
            <div className={`${container} py-10`}>
                <div className={`${grid12} gap-y-8`}>
                    <div className="col-span-12 lg:col-span-6">
                        <Logo />
                        <p className="mt-3 max-w-[40ch] text-muted-foreground">
                            Business inventory management system and analytics.
                        </p>
                    </div>
                    <nav
                        aria-label="Account"
                        className="col-span-12 lg:col-span-6"
                    >
                        <ul className="flex gap-8 lg:justify-end">
                            <li>
                                <Link
                                    href="/login"
                                    className="font-medium underline-offset-4 hover:text-accent hover:underline"
                                >
                                    Log in
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/signup"
                                    className="font-medium underline-offset-4 hover:text-accent hover:underline"
                                >
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Suraj Kumal. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
