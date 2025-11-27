import { Loader } from "lucide-react";

export default function LoaderSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );
}
