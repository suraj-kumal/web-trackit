import { steps } from "../_lib/content";
import { SectionShell } from "./SectionShell";

export function HowItWorks() {
    return (
        <SectionShell
            id="how-it-works"
            title="How it works"
            statement="Three steps from an empty account to a working dashboard."
        >
            <ol className="grid gap-x-8 gap-y-10 md:grid-cols-3">
                {steps.map((step, index) => (
                    <li key={step.title} className="border-t-2 border-border pt-4">
                        <span
                            aria-hidden="true"
                            className="block font-mono text-6xl font-bold leading-none sm:text-7xl"
                        >
                            {index + 1}
                        </span>
                        <h3 className="mt-6 text-2xl font-bold">
                            {step.title}
                        </h3>
                        <p className="mt-2 max-w-[34ch] text-lg text-muted-foreground">
                            {step.description}
                        </p>
                    </li>
                ))}
            </ol>
        </SectionShell>
    );
}
