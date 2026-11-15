import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: number;
    caption: string;
}

export function StatCard({ icon: Icon, title, value, caption }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xl sm:text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{caption}</p>
            </CardContent>
        </Card>
    );
}
