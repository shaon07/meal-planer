import { ShoppingCart } from "lucide-react";
import { memo, useMemo } from "react";
import { useMealPlan } from "../../../hooks/useMealPlan";
import Button from "../../atoms/Button";
import Typography from "../../atoms/Typography";
import ShopingLists from "./ShopingLists";

const ShoppingModule = () => {
  const { generatingList, generateShoppingList, plan } = useMealPlan();

  const hasPlan = useMemo(
    () => Object.values(plan).some((day) => day.length > 0),
    [plan]
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <Typography prefix={<ShoppingCart className="w-6 h-6 text-blue-600" />}>
          Shopping List
        </Typography>

        <Button onClick={generateShoppingList} disabled={!hasPlan}>
          {generatingList ? "Generating..." : "Generate List"}
        </Button>
      </div>

      <ShopingLists />
    </div>
  );
};

export default memo(ShoppingModule);
ShoppingModule.displayName = "ShoppingModule";
