import { Plus } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { DAYS } from "../../../constants";
import { useMealPlan } from "../../../hooks/useMealPlan";
import { useRecipeDetails } from "../../../hooks/useRecipeDetails";
import type { MenuItem, Recipe } from "../../../types";
import Button from "../../atoms/Button";
import Chip from "../../atoms/Chip";
import Select from "../../atoms/Select";
import Lists from "../../molecules/Lists";

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

  const { addRecipe } = useMealPlan();
  const [selectedDay, setSelectedDay] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToDay = useCallback(() => {
    if (selectedDay) {
      addRecipe(selectedDay, recipe);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  }, [selectedDay, addRecipe, recipe]);

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
        <div className="p-1 md:p-6">
          <img
            src={details.strMealThumb}
            alt={details.strMeal}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Chip type="primary">{details.strCategory}</Chip>
              <Chip type="secondary">{details.strArea}</Chip>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add to Meal Plan
              </label>

              <div className="flex flex-col md:flex-row gap-2">
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

            <Lists ingredients={ingredients} />
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

export default memo(RecipeDetails);
RecipeDetails.displayName = "RecipeDetails";
