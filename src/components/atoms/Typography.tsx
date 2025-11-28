import { memo, type ReactNode } from "react";

interface TypographyProps {
  prefix?: ReactNode;
  children: ReactNode;
}

const Typography = ({ prefix, children }: TypographyProps) => {
  return (
    <div className="flex items-center gap-2">
      {prefix}
      <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
    </div>
  );
};

export default memo(Typography);
Typography.displayName = "Typography";
