import React from "react";
import { clsx } from "clsx";

const Card = ({
  children,
  title,
  context,
  className,
}: {
  children?: React.ReactNode;
  title: string;
  context: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        className,
        "rounded-3xl border-[#1C1C21] border overflow-hidden box-border bg-[#fff]/4 min-h-[480px]"
      )}
    >
      {children}
      <div className={"py-3 px-6"}>
        <h3 className={"mb-5 text-center text-[26px] font-[500] text-[#fff]"}>
          {title}
        </h3>
        <p className={"text-[#666666] text-[16px] font-[400] text-center"}>
          {context}
        </p>
      </div>
    </div>
  );
};

export default Card;
