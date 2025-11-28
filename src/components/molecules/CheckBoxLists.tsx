import { memo } from "react";
import CheckBox from "../atoms/CheckBox";

interface CheckBoxListsItemProps {
  id: string;
  title: string;
  description?: string;
  isChecked?: boolean;
}

interface CheckBoxListsProps {
  options: CheckBoxListsItemProps[];
  onChange: (id: string) => void;
}

const CheckBoxLists = ({ options, onChange }: CheckBoxListsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((item) => (
        <CheckBoxListsItem key={item.id} onChange={onChange} item={item} />
      ))}
    </div>
  );
};

export default memo(CheckBoxLists);
CheckBoxLists.displayName = "CheckBoxLists";

export const CheckBoxListsItem = memo(
  ({
    item,
    onChange,
  }: {
    item: CheckBoxListsItemProps;
    onChange: (id: string) => void;
  }) => {
    return (
      <label
        key={item.id}
        className={`flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer ${
          item.isChecked
            ? "bg-gray-50 border-gray-200"
            : "bg-white border-gray-300 hover:border-blue-300"
        }`}
      >
        <CheckBox
          isChecked={!!item.isChecked}
          onChange={() => onChange(item.id)}
        />

        <div className="flex-1">
          <p
            className={`font-medium capitalize ${
              item.isChecked ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {item.title}
          </p>

          {item.description && (
            <p
              className={`text-sm ${
                item.isChecked ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {item.description}
            </p>
          )}
        </div>
      </label>
    );
  }
);
