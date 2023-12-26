import React, { useState } from "react";

export const FindAddressBar = ({
  className = "",
  handleSubmit,
  loading,
  error,
}) => {
  const [newAddress, setNewAddress] = useState("");

  const addAddress = async () => {
    handleSubmit(newAddress);
    setNewAddress("");
  };

  return (
    <div className={`h-20 ${className}`}>
      <div className="mb-2 flex items-center">
        <input
          className="rounded-2xl px-6 py-3 w-[420px]"
          placeholder="BTC address to track e.g. 3E8oci..."
          onChange={(e) => setNewAddress(e.target.value)}
          value={newAddress}
        />
        <button
          className={`ml-4 w-32 h-10 bg-blue-500 border-none px-4 py-2 rounded-2xl focus:outline-none hover:opacity-80 ${
            loading || !newAddress.length ? "bg-slate-400" : ""
          }`}
          type="submit"
          disabled={loading || !newAddress.length}
          onClick={addAddress}
        >
          Add Address
        </button>
      </div>
      {error && <div className="text-red-400 font-semibold">{error}</div>}
    </div>
  );
};
