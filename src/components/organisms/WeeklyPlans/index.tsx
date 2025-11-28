import { Calendar } from "lucide-react";
import { memo } from "react";
import Typography from "../../atoms/Typography";
import WeeklyPlansLists from "./WeeklyPlansLists";

const WeeklyPlans = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <Typography prefix={<Calendar className="w-6 h-6 text-blue-600" />}>
          Weekly Meal Plan
        </Typography>
      </div>

      <WeeklyPlansLists />
    </div>
  );
};

export default memo(WeeklyPlans);
WeeklyPlans.displayName = "WeeklyPlans";
