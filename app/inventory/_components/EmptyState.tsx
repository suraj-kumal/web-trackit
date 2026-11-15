import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    searchTerm: string;
}

export function EmptyState({ icon: Icon, title, searchTerm }: EmptyStateProps) {
    return (
        <div className="p-8 text-center text-muted-foreground">
            <Icon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{title}</p>
            {searchTerm && (
                <p className="text-sm">Try adjusting your search terms</p>
            )}
        </div>
    );
}
