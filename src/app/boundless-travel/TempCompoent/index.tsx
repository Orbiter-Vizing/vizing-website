import React from "react";
// atom
import { useAtom } from "jotai";
import { counterAtom } from "@/atoms/accountAtom";

export default function TempComponent() {
  const [count, setCount] = useAtom(counterAtom);
  return (
    <div>
      TempComponent: {count}
      <span
        onClick={() => setCount((prev) => prev + 1)}
        className="h-[30px] w-[30px] rounded border-[1px] border-white"
      >
        +1
      </span>
    </div>
  );
}
