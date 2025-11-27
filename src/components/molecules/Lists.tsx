import { memo } from "react";

interface ListsProps {
  ingredients: {
    name: string;
    measure?: string;
  }[];
}

const Lists = ({ ingredients }: ListsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {ingredients.map((ingredient, index) => (
        <ListItem
          key={index}
          name={ingredient.name}
          measure={ingredient.measure}
        />
      ))}
    </div>
  );
};

export default memo(Lists);
Lists.displayName = "Lists";

export const ListItem = memo(
  ({ name, measure }: { name: string; measure?: string }) => {
    return (
      <p className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
        <span className="font-medium text-gray-700">{name}</span>
        {measure && <span className="text-gray-500 ml-auto">{measure}</span>}
      </p>
    );
  }
);
ListItem.displayName = "ListItem";
