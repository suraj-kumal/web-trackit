import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    buttonOutline,
    buttonPrimary,
    container,
    grid12,
} from "../_lib/styles";
import { AnimatedWords } from "./AnimatedWords";
import { Reveal } from "./Reveal";
import { StockLedger } from "./StockLedger";
import { bricolage } from "../_lib/fonts";
export function Hero() {
    return (
        <section className={`${container} pb-16 pt-12 sm:pb-24 sm:pt-20`}>
            <div className={`${grid12} gap-y-8`}>
                <AnimatedWords
                    as="h1"
                    text="Know what's in stock and what it earns."
                    className={`${bricolage.className} col-span-12 text-balance text-[clamp(2.75rem,7.5vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] lg:col-span-8`}
                />

                <Reveal
                    onMount
                    delay={0.55}
                    className="col-span-12 lg:col-span-4 lg:self-end"
                >
                    <p className="max-w-[42ch] text-lg sm:text-xl">
                        WhereStock is a business inventory management system
                        with built-in analytics. Record purchases and sales,
                        then see stock left, profit and ROI without a
                        spreadsheet.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Button asChild size="lg" className={buttonPrimary}>
                            <Link href="/signup">Sign up free</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className={buttonOutline}
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                    </div>
                </Reveal>

                <StockLedger />
            </div>
        </section>
    );
}
