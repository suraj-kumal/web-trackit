"use client";

import { AnimatePresence } from "framer-motion";
import { Package, Search } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Item } from "../_lib/types";
import { EmptyState } from "./EmptyState";
import { ItemCard } from "./ItemCard";
import { ItemTableRow } from "./ItemTableRow";

interface ItemsTabProps {
    items: Item[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

export function ItemsTab({
    items,
    searchTerm,
    onSearchChange,
    onEdit,
    onDelete,
}: ItemsTabProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Items</CardTitle>
                        <CardDescription>
                            Manage your inventory items
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 w-full sm:w-64">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search items..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="hidden sm:table">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {items.map((item, index) => (
                                    <ItemTableRow
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                    {/* Mobile card layout for items */}
                    <div className="sm:hidden space-y-4">
                        <AnimatePresence>
                            {items.map((item, index) => (
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                    {items.length === 0 && (
                        <EmptyState
                            icon={Package}
                            title="No items found"
                            searchTerm={searchTerm}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
