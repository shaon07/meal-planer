import { memo, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  onClick,
  disabled = false,
  children,
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${cn(
        "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer w-full justify-center",
        className
      )}`}
    >
      {children}
    </button>
  );
};

export default memo(Button);
Button.displayName = "Button";
