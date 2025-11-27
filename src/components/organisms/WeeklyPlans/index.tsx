import { Calendar } from "lucide-react";
import { memo } from "react";
import WeeklyPlansLists from "./WeeklyPlansLists";

const WeeklyPlans = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Weekly Meal Plan</h2>
      </div>

      <WeeklyPlansLists />
    </div>
  );
};

export default memo(WeeklyPlans);
WeeklyPlans.displayName = "WeeklyPlans";
