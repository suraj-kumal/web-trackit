import { metrics } from "../_lib/content";
import { SectionShell } from "./SectionShell";
import { UnitsChart } from "./UnitsChart";

export function Analytics() {
    return (
        <SectionShell
            id="analytics"
            title="Analytics"
            statement="Revenue, profit and ROI, worked out from your transactions."
            className="border-b-2 bg-secondary text-secondary-foreground"
        >
            <UnitsChart />

            <dl className="mt-12 grid border-t-2 border-secondary-foreground sm:mt-16 sm:grid-cols-2 sm:gap-x-12">
                {metrics.map((metric) => (
                    <div
                        key={metric.term}
                        className="border-b border-secondary-foreground py-5"
                    >
                        <dt className="text-xl font-bold">{metric.term}</dt>
                        <dd className="mt-1 max-w-[40ch] text-lg">
                            {metric.detail}
                        </dd>
                    </div>
                ))}
            </dl>
        </SectionShell>
    );
}
