import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  return (
    <div className="relative hidden lg:block">
      <SearchIcon className="text-white absolute top-2.5 left-2.5 h-5 w-5" />
      <Input 
        className="bg-white/10 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition placeholder:text-slate-200 pl-10"
        placeholder="Search anything..."
      /> 
    </div>
  );
};
