import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin-trace" />
        <Loader2 className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default LoadingScreen;
