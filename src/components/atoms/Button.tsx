import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}

const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
    >
      {children}
    </button>
  );
};

export default Button;
Button.displayName = "Button";
