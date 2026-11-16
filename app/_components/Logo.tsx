
"use client";

import Link from "next/link";
import Image from "next/image";

export function Logo() {
    return (
        <Link
            href="/"
            className="inline-flex items-center gap-2 sm:gap-2.5 md:gap-3"
            aria-label="WhereStock home"
        >
            <div className="relative size-9 sm:size-9 md:size-14 lg:size-14 shrink-0">
                <Image
                    src="/applogo.png"
                    alt="WhereStock logo"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 80px"
                    className="object-contain"
                />
            </div>

            <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight whitespace-nowrap">
                WhereStock
            </span>
        </Link>
    );
}
