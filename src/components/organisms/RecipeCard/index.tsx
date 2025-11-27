import { ChefHat } from "lucide-react";
import type { Recipe } from "../../../types";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onViewDetails }: RecipeCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl cursor-pointer transform hover:scale-105 transition-transform duration-200"
      onClick={() => onViewDetails(recipe)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {recipe.strMeal}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ChefHat className="w-4 h-4" />
          <span>{recipe.strCategory}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
RecipeCard.displayName = "RecipeCard";
