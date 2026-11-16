import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonOnPrimary, container, grid12 } from "../_lib/styles";
import { AnimatedWords } from "./AnimatedWords";
import { Reveal } from "./Reveal";
import { bricolage } from "../_lib/fonts";

export function CallToAction() {
    return (
        <section className="border-t-2 border-border bg-primary text-primary-foreground">
            <div className={`${container} py-16 sm:py-24`}>
                <div className={`${grid12} items-end gap-y-8`}>
                    <AnimatedWords
              as="h2"
              onView
              text="Start tracking your stock today."
              className={`col-span-12 text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] lg:col-span-8`}
                    />
                    <Reveal delay={0.3} className="col-span-12 lg:col-span-4">
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
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
