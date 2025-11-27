import { Search } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { useGetCategoriesQuery } from "../../../services/recipes.service";
import Input from "../../atoms/Input";

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

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

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
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
          >
            <option value="all">All Categories</option>
            {data?.categories.map((category: any) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default memo(FilterRecipe);
FilterRecipe.displayName = "FilterRecipe";
