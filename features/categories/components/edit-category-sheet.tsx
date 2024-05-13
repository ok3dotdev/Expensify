import { z } from "zod";
import { Loader2 } from "lucide-react";


import { useOpenCategory } from "@/features/categories/store/use-open-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

import { insertCategorySchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
  const { id, isOpen, onClose } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?", 
    "You are about to delete this category. All transactions under this category will become uncategorized."
  );

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);
  const category = categoryQuery.data;

  const isPending = 
    editMutation.isPending || 
    deleteMutation.isPending;

  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = category ? {
    name: categoryQuery.data.name,
  } : undefined;

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Category
            </SheetTitle>
            <SheetDescription>
              Edit an existing category
            </SheetDescription>
          </SheetHeader>
          {isLoading 
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
              </div>
            ) 
            : (
              <CategoryForm 
                id={id}
                onSubmit={onSubmit} 
                disabled={isPending}
                onDelete={onDelete}
                defaultValues={defaultValues}
              />
            )
          }
        </SheetContent>
      </Sheet>
    </>
  );
};
