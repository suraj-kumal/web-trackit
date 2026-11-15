import type { ReactNode } from "react";
import { container, grid12 } from "../_lib/styles";

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
                    <h2 className="col-span-12 text-xl font-bold lg:col-span-3">
                        {title}
                    </h2>
                    <div className="col-span-12 lg:col-span-9">
                        <p className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                            {statement}
                        </p>
                        <div className="mt-12 sm:mt-16">{children}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
