import type { ReactNode } from "react";

export interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  ingredients: { name: string; measure: string }[];
}

export interface MealPlan {
  [date: string]: Recipe | null; // e.g., "2025-01-20": Recipe
}

export interface MenuItem {
  value: string;
  label: ReactNode;
}
