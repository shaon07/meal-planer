import { ChefHat } from "lucide-react";

export default function Logo() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <ChefHat className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Recipe Meal Planner
          </h1>
        </div>
      </div>
    </header>
  );
}
