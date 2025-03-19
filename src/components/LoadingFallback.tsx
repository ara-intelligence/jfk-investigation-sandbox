
import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-lg font-medium text-muted-foreground animate-pulse">Loading investigation files...</p>
    </div>
  );
};

export default LoadingFallback;
