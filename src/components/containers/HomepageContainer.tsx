import { useCallback } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import PlanModule from "../modules/Plan";
import RecipiesModule from "../modules/Recipies";
import ShoppingModule from "../modules/Shopping";

export default function HomepageContainer() {
  const { params } = useQueryParams();

  const render = useCallback((tab: string) => {
    console.log("tab", tab);
    switch (tab) {
      case "plan":
        return <PlanModule />;

      case "shopping":
        return <ShoppingModule />;

      default:
        return <RecipiesModule />;
    }
  }, []);

  return <div className="p-4">{render(params.tab)}</div>;
}
