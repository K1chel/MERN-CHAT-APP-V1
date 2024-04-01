import { Loader2Icon } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 h-screen w-full bg-secondary/10 z-50">
      <div className="flex items-center justify-center flex-col gap-y-3 h-full bg-opacity-50 backdrop-blur-lg">
        <Loader2Icon className="w-12 h-12 animate-spin" />
        <p className="text-xl font-bold ml-2">Loading...</p>
      </div>
    </div>
  );
};
