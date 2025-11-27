import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { DAYS } from "../../../constants";
import { useRecipeDetails } from "../../../hooks/useRecipeDetails";
import type { MenuItem, Recipe } from "../../../types";
import Button from "../../atoms/Button";
import Select from "../../atoms/Select";

interface RecipeDetailsProps {
  recipe: Recipe;
}
const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const {
    recipe: details,
    ingredients,
    loading,
    error,
  } = useRecipeDetails(recipe.idMeal);

  const [selectedDay, setSelectedDay] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToDay = useCallback(() => {
    if (selectedDay) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  }, [selectedDay]);

  const daysOptions: MenuItem[] = useMemo(
    () =>
      DAYS.map((day) => {
        return {
          value: day,
          label: day,
        };
      }),
    []
  );

  return (
    <div>
      {loading && (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe details...</p>
        </div>
      )}

      {error && (
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      )}

      {details && !loading && (
        <div className="p-6">
          <img
            src={details.strMealThumb}
            alt={details.strMeal}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {details.strCategory}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {details.strArea}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add to Meal Plan
              </label>

              <div className="flex gap-2">
                <Select
                  options={[
                    { value: "", label: "Select a day..." },
                    ...daysOptions,
                  ]}
                  value={selectedDay}
                  onChange={(day) => setSelectedDay(day)}
                />

                <Button onClick={handleAddToDay} disabled={!selectedDay}>
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>

              {showSuccess && (
                <p className="mt-2 text-sm text-green-600 font-medium">
                  Added to {selectedDay}!
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Ingredients
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span className="font-medium text-gray-700">
                    {ingredient.name}
                  </span>
                  {ingredient.measure && (
                    <span className="text-gray-500 ml-auto">
                      {ingredient.measure}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Instructions
            </h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {details.strInstructions}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
RecipeDetails.displayName = "RecipeDetails";
