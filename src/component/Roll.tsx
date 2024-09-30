import React from "react";
import { clsx } from "clsx";

const Roll = ({
  children,

  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return [1, 2].map((key) => (
    <ul key={key} className={clsx("flex", className)}>
      {children}
    </ul>
  ));
};

export default Roll;
