import { Search } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetCategoriesQuery } from "../../../services/recipes.service";
import type { Category, MenuItem } from "../../../types";
import Input from "../../atoms/Input";
import Select from "../../atoms/Select";

interface FilterRecipeProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}
const FilterRecipe = ({
  onSearchChange,
  onCategoryChange,
}: FilterRecipeProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data } = useGetCategoriesQuery({});

  const categoryOptions: MenuItem[] = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...(data?.categories?.map((c: Category) => ({
        value: c.strCategory,
        label: c.strCategory,
      })) ?? []),
    ],
    [data]
  );

  const searchTimeout = useRef<number | null>(null);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = window.setTimeout(() => {
        onSearchChange(value);
      }, 300);
    },
    [onSearchChange]
  );

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSelectedCategory(value);
      onCategoryChange(value);
    },
    [onCategoryChange]
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          prefixIcon={<Search className="w-5 h-5" />}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="md:w-64">
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categoryOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(FilterRecipe);
FilterRecipe.displayName = "FilterRecipe";
