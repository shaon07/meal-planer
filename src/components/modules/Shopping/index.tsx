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
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-6">
        <Typography
          className="w-full flex-1"
          prefix={<ShoppingCart className="w-6 h-6 text-blue-600" />}
        >
          Shopping List
        </Typography>

        <div className="w-full md:w-max">
          <Button onClick={generateShoppingList} disabled={!hasPlan}>
            {generatingList ? "Generating..." : "Generate List"}
          </Button>
        </div>
      </div>

      <ShopingLists />
    </div>
  );
};

export default memo(ShoppingModule);
ShoppingModule.displayName = "ShoppingModule";
