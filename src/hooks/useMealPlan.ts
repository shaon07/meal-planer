import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../context/redux/store";

import { useCallback } from "react";
import {
  addRecipeToDay,
  clearPurchasedItems,
  removeRecipeFromDay,
  setShoppingList,
  toggleItemPurchased,
} from "../context/redux/features/recipe/mealPlanSlice";
import { useLazyGetRecipeByIdQuery } from "../services/recipes.service";
import type { Recipe, RecipeDetails, ShoppingListItem } from "../types";

export const useMealPlan = () => {
  const dispatch = useDispatch();
  const { plan, shoppingList } = useSelector(
    (state: RootState) => state.mealPlan
  );
  const [getRecipeById, { isFetching: generatingList }] =
    useLazyGetRecipeByIdQuery();

  const addRecipe = (day: string, recipe: Recipe) => {
    dispatch(addRecipeToDay({ day, recipe }));
  };

  const removeRecipe = (day: string, recipeId: string) => {
    dispatch(removeRecipeFromDay({ day, recipeId }));
  };

  const generateShoppingList = useCallback(async () => {
    try {
      const allRecipeIds = Object.values(plan)
        .flat()
        .map((recipe) => recipe.idMeal);

      const uniqueRecipeIds = [...new Set(allRecipeIds)];

      const recipeDetailsPromises = uniqueRecipeIds.map((id) =>
        getRecipeById({
          i: id,
        })
          .unwrap()
          .then((data) => data.meals[0] as RecipeDetails)
      );

      const recipeDetails = await Promise.all(recipeDetailsPromises);

      const ingredientsMap = new Map<
        string,
        { measure: string; count: number }
      >();

      recipeDetails.forEach((recipe) => {
        for (let i = 1; i <= 20; i++) {
          const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetails];
          const measure = recipe[`strMeasure${i}` as keyof RecipeDetails];

          if (ingredient && ingredient.trim()) {
            const ingredientName = ingredient.trim().toLowerCase();
            const existing = ingredientsMap.get(ingredientName);

            if (existing) {
              existing.count++;
              if (measure?.trim()) {
                existing.measure = `${existing.measure}, ${measure.trim()}`;
              }
            } else {
              ingredientsMap.set(ingredientName, {
                measure: measure?.trim() || "",
                count: 1,
              });
            }
          }
        }
      });

      const shoppingItems: ShoppingListItem[] = Array.from(
        ingredientsMap.entries()
      ).map(([name, { measure }]) => ({
        id: `${name}-${Date.now()}-${Math.random()}`,
        name,
        measure,
        purchased: false,
      }));

      dispatch(setShoppingList(shoppingItems));
    } catch (error) {
      console.error("Failed to generate shopping list:", error);
    }
  }, [plan, getRecipeById, dispatch]);

  const togglePurchased = (itemId: string) => {
    dispatch(toggleItemPurchased(itemId));
  };

  const clearCompleted = () => {
    dispatch(clearPurchasedItems());
  };

  return {
    plan,
    shoppingList,
    generatingList,
    addRecipe,
    removeRecipe,
    generateShoppingList,
    togglePurchased,
    clearCompleted,
  };
};
