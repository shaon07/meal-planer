import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { DAYS } from "../../../../constants";
import type { Recipe, ShoppingListItem } from "../../../../types";

interface MealPlanState {
  plan: Record<string, Recipe[]>;
  shoppingList: ShoppingListItem[];
}

const initialPlan = DAYS.reduce((acc, day) => {
  acc[day] = [];
  return acc;
}, {} as Record<string, Recipe[]>);

const initialState: MealPlanState = {
  plan: initialPlan,
  shoppingList: [],
};

const mealPlanSlice = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {
    addRecipeToDay: (
      state,
      action: PayloadAction<{ day: string; recipe: Recipe }>
    ) => {
      const { day, recipe } = action.payload;
      if (!state.plan[day].find((r) => r.idMeal === recipe.idMeal)) {
        state.plan[day].push(recipe);
      }
    },
    removeRecipeFromDay: (
      state,
      action: PayloadAction<{ day: string; recipeId: string }>
    ) => {
      const { day, recipeId } = action.payload;
      state.plan[day] = state.plan[day].filter((r) => r.idMeal !== recipeId);
    },
    setShoppingList: (state, action: PayloadAction<ShoppingListItem[]>) => {
      state.shoppingList = action.payload;
    },
    toggleItemPurchased: (state, action: PayloadAction<string>) => {
      const item = state.shoppingList.find((i) => i.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
    clearPurchasedItems: (state) => {
      state.shoppingList = state.shoppingList.filter((item) => !item.purchased);
    },
  },
});

export const {
  addRecipeToDay,
  removeRecipeFromDay,
  setShoppingList,
  toggleItemPurchased,
  clearPurchasedItems,
} = mealPlanSlice.actions;

export default mealPlanSlice.reducer;
