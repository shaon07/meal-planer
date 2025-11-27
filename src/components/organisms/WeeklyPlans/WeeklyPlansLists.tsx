import { Trash2 } from "lucide-react";
import { memo, useCallback } from "react";
import { DAYS } from "../../../constants";
import { useMealPlan } from "../../../hooks/useMealPlan";
import type { Recipe } from "../../../types";

const WeeklyPlansLists = () => {
  const { plan, removeRecipe } = useMealPlan();

  const handleRemove = useCallback(
    (day: string, recipeId: string) => {
      removeRecipe(day, recipeId);
    },
    [removeRecipe]
  );

  return (
    <div className="space-y-4">
      {DAYS.map((day) => (
        <div
          key={day}
          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
        >
          <h3 className="font-bold text-lg text-gray-800 mb-3">{day}</h3>

          {plan[day].length === 0 ? (
            <p className="text-gray-400 italic text-sm">No meals planned</p>
          ) : (
            <div className="space-y-2">
              {plan[day].map((recipe) => (
                <WeeklyPlansList
                  recipe={recipe}
                  onClick={() => handleRemove(day, recipe.idMeal)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(WeeklyPlansLists);
WeeklyPlansLists.displayName = "WeeklyPlansLists";

export const WeeklyPlansList = memo(
  ({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) => {
    return (
      <div
        key={recipe.idMeal}
        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition"
      >
        <div className="flex items-center gap-3 flex-1">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">{recipe.strMeal}</p>
            <p className="text-sm text-gray-500">{recipe.strCategory}</p>
          </div>
        </div>

        <button
          onClick={onClick}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Remove meal"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  }
);
