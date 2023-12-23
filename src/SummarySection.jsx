import React from "react";
import { BTC_PRICE, SATS } from "./App";

export const SummarySection = ({ className = "", balance = 0 }) => {
  return (
    <div className={className}>
      <span className="mb-4 font-semibold text-[60px]">
        ${(balance / SATS) * BTC_PRICE}
      </span>
      <div>
        <span>Balance:</span>
        <span className="ml-2">{balance / SATS} BTC</span>
      </div>
    </div>
  );
};
