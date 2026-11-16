import type { ReactNode } from "react";
import { container, grid12 } from "../_lib/styles";
import { AnimatedWords } from "./AnimatedWords";
import { Reveal } from "./Reveal";
import { bricolage } from "../_lib/fonts";

interface SectionShellProps {
    id: string;
    title: string;
    statement: string;
    children: ReactNode;
    /** extra classes for the <section>, e.g. a background color */
    className?: string;
}

/**
 * Swiss two-column section: the narrow left column carries the section name,
 * the wide right column carries a statement and the content.
 */
export function SectionShell({
    id,
    title,
    statement,
    children,
    className = "",
}: SectionShellProps) {
    return (
        <section
            id={id}
            className={`scroll-mt-16 border-t-2 border-border ${className}`}
        >
            <div className={`${container} py-16 sm:py-24`}>
                <div className={`${grid12} gap-y-8`}>
                    <div className="col-span-12 lg:col-span-3">
                        <Reveal>
                          <h2 className={`${bricolage.className} text-xl font-bold`}>{title}</h2>
                        </Reveal>
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <AnimatedWords
                            as="p"
                            onView
                            text={statement}
                            className={`${bricolage.className} max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl`}
                        />
                        <div className="mt-12 sm:mt-16">{children}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
