import { features } from "../_lib/content";
import { grid12 } from "../_lib/styles";
import { SectionShell } from "./SectionShell";

export function Features() {
    return (
        <SectionShell
            id="features"
            title="Features"
            statement="Stock, sales and profit in one system, without the spreadsheet."
        >
            <ul className="border-t-2 border-border">
                {features.map((feature) => (
                    <li
                        key={feature.title}
                        className={`${grid12} border-b border-border py-6 sm:py-8`}
                    >
                        <h3 className="col-span-12 text-xl font-bold sm:text-2xl md:col-span-5">
                            {feature.title}
                        </h3>
                        <p className="col-span-12 mt-2 max-w-[55ch] text-lg text-muted-foreground md:col-span-7 md:mt-0">
                            {feature.description}
                        </p>
                    </li>
                ))}
            </ul>
        </SectionShell>
    );
}
