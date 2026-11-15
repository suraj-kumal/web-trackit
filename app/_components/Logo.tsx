import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2.5" aria-label="WhereStock home">
            <span
                aria-hidden="true"
                className="block size-6 border-2 border-border bg-primary"
            />
            <span className="text-xl font-extrabold tracking-tight">
                WhereStock
            </span>
        </Link>
    );
}
