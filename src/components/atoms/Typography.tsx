import { memo, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface TypographyProps {
  prefix?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Typography = ({ prefix, children, className = "" }: TypographyProps) => {
  return (
    <div className={`${cn("flex items-center gap-2", className)}`}>
      {prefix}
      <h2 className="text-base md:text-2xl font-bold text-gray-800">
        {children}
      </h2>
    </div>
  );
};

export default memo(Typography);
Typography.displayName = "Typography";
