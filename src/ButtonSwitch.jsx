import React from "react";

export const ButtonSwitch = ({
  className = "",
  isFirstSelected,
  firstCtaText,
  secondCtaText,
  onChange,
}) => {
  return (
    <div
      className={`rounded-xl bg-slate-400 flex overflow-hidden ${className}`}
    >
      <button
        className={`transition ease-in-out duration-300 focus:outline-none hover:opacity-80 border-none px-4 ${
          isFirstSelected ? "bg-blue-500" : "bg-transparent"
        }`}
        onClick={() => onChange(false)}
      >
        {firstCtaText}
      </button>
      <button
        className={`transition ease-in-out duration-300 focus:outline-none hover:opacity-80 border-none px-4 ${
          isFirstSelected ? "bg-transparent" : "bg-blue-500"
        }`}
        onClick={() => onChange(true)}
      >
        {secondCtaText}
      </button>
    </div>
  );
};
