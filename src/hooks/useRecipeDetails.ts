import { useCallback, useMemo } from "react";
import { useGetRecipeByIdQuery } from "../services/recipes.service";
import type { Ingredient, RecipeDetails } from "../types";

export const useRecipeDetails = (id: string | null) => {
  const {
    data,
    isFetching: loading,
    error,
  } = useGetRecipeByIdQuery(
    {
      i: id,
    },
    { skip: !id }
  );

  const recipe = useMemo(
    () => (data?.meals && data?.meals?.length > 0 ? data?.meals[0] : null),
    [data]
  );

  const getIngredients = useCallback(() => {
    if (!recipe) return [];

    const ingredients: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetails];
      const measure = recipe[`strMeasure${i}` as keyof RecipeDetails];

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure?.trim() || "",
        });
      }
    }
    return ingredients;
  }, [recipe]);

  const errorMessage = error
    ? "message" in error
      ? error.message
      : "Failed to fetch recipe details"
    : null;

  return {
    recipe,
    ingredients: getIngredients(),
    loading,
    error: errorMessage,
  };
};
