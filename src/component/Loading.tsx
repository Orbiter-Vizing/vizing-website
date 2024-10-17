import React from "react";
import { clsx } from "clsx";

import IconLoading from "@/assets/images/icon/loading.svg";

const LoadingSpin = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="opacity-50 animate-spinInfinite">
      <IconLoading />
    </div>
  );
};

export default LoadingSpin;
