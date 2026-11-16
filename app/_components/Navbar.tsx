// "use client";

// import Link from "next/link";
// import { motion, useScroll, useSpring } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/app/components/modeToggle";
// import { useAuthToken } from "../_hooks/useAuthToken";
// import { navLinks } from "../_lib/content";
// import { container } from "../_lib/styles";
// import { Logo } from "./Logo";

// export function Navbar() {
//     const hasAuthToken = useAuthToken();

//     // Reading progress: the navbar's bottom rule fills with the primary color
//     const { scrollYProgress } = useScroll();
//     const scaleX = useSpring(scrollYProgress, {
//         stiffness: 120,
//         damping: 30,
//         restDelta: 0.001,
//     });

//     return (
//         <header className="sticky top-0 z-50 border-b-2 border-border bg-background">
//             <div
//                 className={`${container} flex h-16 items-center justify-between gap-4`}
//             >
//                 <Logo />

//                 <nav aria-label="Primary" className="hidden md:block">
//                     <ul className="flex items-center gap-8">
//                         {navLinks.map((link) => (
//                             <li key={link.href}>
//                                 <a
//                                     href={link.href}
//                                     className="font-medium underline-offset-4 hover:text-accent hover:underline"
//                                 >
//                                     {link.label}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>

//                 <div className="flex items-center gap-2 sm:gap-3">
//                     <ModeToggle />
//                     {hasAuthToken ? (
//                         <Button
//                             asChild
//                             className="border-2 border-border font-bold"
//                         >
//                             <Link href="/dashboard">
//                                 <span className="hidden sm:inline">
//                                     Go to dashboard
//                                 </span>
//                                 <span className="sm:hidden">Dashboard</span>
//                             </Link>
//                         </Button>
//                     ) : (
//                         <>
//                             <Button
//                                 asChild
//                                 variant="ghost"
//                                 className="font-bold"
//                             >
//                                 <Link href="/login">Log in</Link>
//                             </Button>
//                             <Button
//                                 asChild
//                                 className="border-2 border-border font-bold"
//                             >
//                                 <Link href="/signup">Sign up</Link>
//                             </Button>
//                         </>
//                     )}
//                 </div>
//             </div>
//             <motion.div
//                 aria-hidden="true"
//                 style={{ scaleX }}
//                 className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-primary"
//             />
//         </header>
//     );
// }

"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/modeToggle";
import { useAuthToken } from "../_hooks/useAuthToken";
import { navLinks } from "../_lib/content";
import { container } from "../_lib/styles";
import { Logo } from "./Logo";

export function Navbar() {
    const hasAuthToken = useAuthToken();

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <header className="sticky top-0 z-50 border-b-2 border-border bg-background">
            <div
                className={`${container} flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4`}
            >
                <Logo />

                <nav aria-label="Primary" className="hidden md:block">
                    <ul className="flex items-center gap-5 lg:gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="text-sm lg:text-base font-medium underline-offset-4 hover:text-accent hover:underline"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
                    <ModeToggle />

                    {hasAuthToken ? (
                        <Button
                            asChild
                            size="sm"
                            className="border-2 border-border font-bold sm:h-10 sm:px-4"
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
                                size="sm"
                                className="px-2 sm:px-4 font-bold"
                            >
                                <Link href="/login">Log in</Link>
                            </Button>

                            <Button
                                asChild
                                size="sm"
                                className="border-2 border-border px-3 sm:px-4 font-bold"
                            >
                                <Link href="/signup">Sign up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <motion.div
                aria-hidden="true"
                style={{ scaleX }}
                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-primary"
            />
        </header>
    );
}
