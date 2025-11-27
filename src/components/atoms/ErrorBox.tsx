import { memo } from "react";

interface ErrorBoxProps {
  error: string;
}

const ErrorBox = ({ error }: ErrorBoxProps) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-700 font-medium">{error}</p>
    </div>
  );
};

export default memo(ErrorBox);
ErrorBox.displayName = "ErrorBox";
