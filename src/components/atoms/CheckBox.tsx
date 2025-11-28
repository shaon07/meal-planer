import { memo } from "react";

export interface CheckBoxProps {
  isChecked: boolean;
  onChange: () => void;
}

const CheckBox = ({ isChecked, onChange }: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer outline-0"
    />
  );
};

export default memo(CheckBox);
CheckBox.displayName = "CheckBox";
