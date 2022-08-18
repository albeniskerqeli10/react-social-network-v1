import { Suspense } from "react";
import SmallSpinner from "./SmallSpinner";

type SuspenseWrapperProps = {
  children: React.ReactNode;
};

const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
  return (
    <div className="w-full h-auto flex items-center justify-center flex-wrap">
      <Suspense fallback={<SmallSpinner />}>{children}</Suspense>
    </div>
  );
};

export default SuspenseWrapper;
