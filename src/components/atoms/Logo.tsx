import { ChefHat } from "lucide-react";
import Typography from "./Typography";

export default function Logo() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 py-6">
        <Typography prefix={<ChefHat className="w-6 h-6 text-blue-600" />}>
          Recipe Meal Planner
        </Typography>
      </div>
    </header>
  );
}
