import { ShoppingCart, Trash2 } from "lucide-react";
import { memo, useMemo } from "react";
import { useMealPlan } from "../../../hooks/useMealPlan";
import Button from "../../atoms/Button";
import CheckBoxLists from "../../molecules/CheckBoxLists";

const ShopingLists = () => {
  const { shoppingList, togglePurchased, clearCompleted } = useMealPlan();

  const purchasedCount = useMemo(
    () => shoppingList.filter((item) => item.purchased).length,
    [shoppingList]
  );

  const options = useMemo(
    () =>
      shoppingList.map((item) => ({
        id: item.id,
        title: item.name,
        description: item.measure,
        isChecked: item.purchased,
      })),
    [shoppingList]
  );

  return (
    <>
      {shoppingList.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No items in your shopping list</p>
          <p className="text-sm text-gray-400 mt-2">
            Add meals to your weekly plan and generate a shopping list
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 text-sm">
            <p className="text-gray-600">
              {purchasedCount} of {shoppingList.length} items purchased
            </p>
            {purchasedCount > 0 && (
              <Button
                onClick={clearCompleted}
                className="text-red-600 hover:text-red-700 flex bg-transparent hover:bg-gray-200 items-center gap-1 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear Completed
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            <CheckBoxLists options={options} onChange={togglePurchased} />
          </div>
        </>
      )}
    </>
  );
};

export default memo(ShopingLists);
ShopingLists.displayName = "ShopingLists";
