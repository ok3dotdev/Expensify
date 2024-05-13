import { TriangleAlert } from "lucide-react";

import { useOpenTransaction } from "@/features/transactions/store/use-open-transaction";

import { useOpenCategory } from "@/features/categories/store/use-open-category";

import { cn } from "@/lib/utils";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
}

export const CategoryColumn = ({
  id,
  category,
  categoryId,
}: Props) => {
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const { onOpen: onOpenCategory } = useOpenCategory();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}>
      {!category && <TriangleAlert className="mr-2 h-4 w-4 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};
