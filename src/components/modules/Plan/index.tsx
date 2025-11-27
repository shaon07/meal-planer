import { memo } from "react";
import WeeklyPlans from "../../organisms/WeeklyPlans";

const PlanModule = () => {
  return <WeeklyPlans />;
};

export default memo(PlanModule);
PlanModule.displayName = "PlanModule";
