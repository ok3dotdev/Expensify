"use client";

import { Loader2, Plus } from "lucide-react";

import { useNewCategory } from "@/features/categories/store/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = 
    categoriesQuery.isLoading || 
    deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Categories
        </CardTitle>
        <Button onClick={newCategory.onOpen} size="sm" className="w-full lg:w-auto">
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          disabled={isDisabled}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteCategories.mutate({ ids });
          }}
          filterKey="name" 
          columns={columns} 
          data={categories}
        />
      </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
