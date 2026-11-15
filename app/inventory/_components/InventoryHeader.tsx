"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ExternalLink, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/modeToggle";
import type { Item } from "../_lib/types";
import { itemVariants } from "../_lib/variants";
import type { useItemDialog } from "../_hooks/useItemDialog";
import type { useTransactionDialog } from "../_hooks/useTransactionDialog";
import { ItemFormDialog } from "./ItemFormDialog";
import { TransactionFormDialog } from "./TransactionFormDialog";

interface InventoryHeaderProps {
    itemDialog: ReturnType<typeof useItemDialog>;
    transactionDialog: ReturnType<typeof useTransactionDialog>;
    items: Item[];
    isSubmitting: boolean;
    onItemSubmit: (e: FormEvent) => void;
    onTransactionSubmit: (e: FormEvent) => void;
}

export function InventoryHeader({
    itemDialog,
    transactionDialog,
    items,
    isSubmitting,
    onItemSubmit,
    onTransactionSubmit,
}: InventoryHeaderProps) {
    const router = useRouter();

    return (
        <motion.div className="mb-8" variants={itemVariants}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                        Inventory Management
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Manage your items and transactions
                    </p>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full sm:w-auto md:justify-end">
                    <ItemFormDialog
                        open={itemDialog.itemDialogOpen}
                        onOpenChange={itemDialog.handleOpenChange}
                        editingItem={itemDialog.editingItem}
                        form={itemDialog.itemForm}
                        onNameChange={(name) =>
                            itemDialog.setItemForm({ name })
                        }
                        isSubmitting={isSubmitting}
                        onSubmit={onItemSubmit}
                        onCancel={() => itemDialog.setItemDialogOpen(false)}
                    />

                    <TransactionFormDialog
                        open={transactionDialog.transactionDialogOpen}
                        onOpenChange={transactionDialog.handleOpenChange}
                        editingTransaction={transactionDialog.editingTransaction}
                        form={transactionDialog.transactionForm}
                        onChange={transactionDialog.updateForm}
                        items={items}
                        isSubmitting={isSubmitting}
                        onSubmit={onTransactionSubmit}
                        onCancel={() =>
                            transactionDialog.setTransactionDialogOpen(false)
                        }
                    />

                    <div className="flex justify-center items-center w-full md:justify-end md:items-end md:w-full">
                        <Button
                            onClick={() => router.push("/dashboard")}
                            variant="ghost"
                            className="cursor-pointer"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="sm:inline">Dashboard</span>
                            <ExternalLink className="w-3 h-3 ml-auto" />
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
