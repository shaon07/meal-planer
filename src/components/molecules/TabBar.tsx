import { useState } from "react";
import type { MenuItem } from "../../types";

interface TabBarProps {
  options: MenuItem[];
  onTabChange: (selectedTab: MenuItem) => void;
}

export default function TabBar({ options, onTabChange }: TabBarProps) {
  const [activeTab, setActiveTab] = useState<MenuItem>(options[0]);

  return (
    <div className="bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1">
          {options.map((option) => (
            <button
              key={option.value}
              className={`px-6 py-4 font-medium transition cursor-pointer border-b-2 ${
                activeTab.value === option.value
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveTab(option);
                onTabChange(option);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
