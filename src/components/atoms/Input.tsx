import { memo, type ChangeEvent, type ReactNode } from "react";

interface InputProps {
  value: string;
  type?: "text" | "password" | "email" | "number";
  onChange: (e: string) => void;
  prefixIcon?: ReactNode;
}

const Input = ({ value, type = "text", onChange, prefixIcon }: InputProps) => {
  return (
    <div className="flex-1 relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">
        {prefixIcon}
      </span>

      <input
        type={type}
        placeholder="Search recipes..."
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  );
};

export default memo(Input);
