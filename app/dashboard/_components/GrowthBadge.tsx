import { ArrowDown, ArrowUp, Minus } from "lucide-react";

/**
 * Period-over-period change. Shows green/up for growth, red/down for decline,
 * and "no data" when there was nothing to compare with (null).
 */
export function GrowthBadge({
    value,
    label,
}: {
    value: number | null | undefined;
    label: string;
}) {
    if (value == null) {
        return (
            <div className="flex items-center text-xs text-muted-foreground">
                <Minus className="mr-1 h-3 w-3" />
                <span>No sales to compare {label}</span>
            </div>
        );
    }

    const up = value >= 0;
    const Icon = up ? ArrowUp : ArrowDown;
    const color = up ? "text-green-500" : "text-red-500";

    return (
        <div className="flex items-center text-xs text-muted-foreground">
            <Icon className={`mr-1 h-3 w-3 ${color}`} />
            <span className={`${color} font-medium`}>
                {up ? "+" : ""}
                {value.toFixed(1)}%
            </span>
            <span className="ml-1">{label}</span>
        </div>
    );
}
