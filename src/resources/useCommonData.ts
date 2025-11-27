import type { MenuItem } from "../types";

export default function useCommonData() {
  const headerTabMenus: MenuItem[] = [
    { value: "recipes", label: "Recipes" },
    { value: "plan", label: "Meal Plan" },
    { value: "shopping", label: "Shopping List" },
  ];

  return { headerTabMenus };
}
