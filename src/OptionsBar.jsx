import React from "react";
import { ButtonSwitch } from "./ButtonSwitch";
import { AddressSelector } from "./AddressSelector";

export const OptionsBar = ({
  className = "",
  addresses,
  currentAddress,
  setCurrentAddress,
  removeAddress,
  portfolioMode,
  setPortfolioMode,
}) => {
  return (
    <div className={`flex ${className}`}>
      <AddressSelector
        addresses={addresses}
        currentAddress={currentAddress}
        handleChange={setCurrentAddress}
        disabled={!addresses.length || portfolioMode}
      />
      <button
        className="ml-4 mr-8 bg-red-500 border-none px-4 py-2 rounded-2xl focus:outline-none hover:opacity-80"
        onClick={removeAddress}
      >
        Remove Address
      </button>
      <ButtonSwitch
        className="ml-auto"
        isFirstSelected={!portfolioMode}
        firstCtaText="Individual"
        secondCtaText="Portfolio"
        onChange={setPortfolioMode}
      />
    </div>
  );
};
