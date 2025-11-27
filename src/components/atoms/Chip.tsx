import { memo, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ChipProps {
  children: ReactNode;
  type?: "primary" | "secondary";
}

const Chip = ({ children, type = "primary" }: ChipProps) => {
  return (
    <span
      className={`${cn(
        "px-3 py-1 rounded-full text-sm font-medium",
        type === "primary"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700"
      )}`}
    >
      {children}
    </span>
  );
};

export default memo(Chip);
Chip.displayName = "Chip";
