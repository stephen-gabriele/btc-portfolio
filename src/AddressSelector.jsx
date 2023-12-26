import React from "react";

export const AddressSelector = ({
  currentAddress,
  addresses,
  disabled,
  handleChange,
}) => {
  return (
    <label>
      <span className="pr-2">Selected Address:</span>
      <select
        className={`w-40 focus:outline-none border-none rounded-lg px-8 py-2 ${
          disabled ? "opacity-50" : ""
        }`}
        value={currentAddress}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      >
        {addresses.map((address) => (
          <option key={address} className="rounded-lg" value={address}>
            {address.slice(0, 4)}...{address.slice(-4)}
          </option>
        ))}
      </select>
    </label>
  );
};
