"use client";

import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Item } from "../_lib/types";

interface ItemActionsProps {
    item: Item;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

/** Edit button + delete confirmation. The caller supplies the wrapper div. */
export function ItemActions({ item, onEdit, onDelete }: ItemActionsProps) {
    return (
        <>
            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Edit className="w-4 h-4" />
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete "{item.name}" and all
                            its associated transactions. This action cannot be
                            undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => onDelete(item.id)}
                            className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
