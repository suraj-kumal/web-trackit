import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonOnPrimary, container, grid12 } from "../_lib/styles";

export function CallToAction() {
    return (
        <section className="border-t-2 border-border bg-primary text-primary-foreground">
            <div className={`${container} py-16 sm:py-24`}>
                <div className={`${grid12} items-end gap-y-8`}>
                    <h2 className="col-span-12 text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] lg:col-span-8">
                        Start tracking your stock today.
                    </h2>
                    <div className="col-span-12 lg:col-span-4">
                        <p className="max-w-[36ch] text-lg sm:text-xl">
                            Create a free account, add your first item and
                            record your first sale.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className={`${buttonOnPrimary} mt-8`}
                        >
                            <Link href="/signup">Sign up free</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
