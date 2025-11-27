import type { MenuItem } from "../../types";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: MenuItem[];
}

export default function Select({ value, onChange, options }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
    >
      <option value="all">All Categories</option>
      {options.map((item: MenuItem) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
