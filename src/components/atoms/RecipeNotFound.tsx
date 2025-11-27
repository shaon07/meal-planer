import { ChefHat } from "lucide-react";
import { memo } from "react";

const RecipeNotFound = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 text-lg">No recipes found</p>
      <p className="text-gray-400 mt-2">Try a different search or category</p>
    </div>
  );
};

export default memo(RecipeNotFound);
RecipeNotFound.displayName = "RecipeNotFound";
