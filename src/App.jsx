import { useState } from "react";
import "./App.css";
import { Search } from "./Search";
import { TransactionsSection } from "./TransactionsSection";
import { ButtonSwitch } from "./ButtonSwitch";
import { AddressSelector } from "./AddressSelector";
import { SummarySection } from "./SummarySection";
import { useEffect } from "react";

// TODO: get live BTC price
export const BTC_PRICE = 43_435;
export const SATS = 100_000_000; // Number of Satoshis in a Bitcoin
const LOCAL_STORAGE_KEY = "btc-user-addresses";

function App() {
  const [userInformation, setUserInformation] = useState({});
  const [currentAddress, setCurrentAddress] = useState("");
  const [portfolioMode, setPortfolioMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO: memoize
  const addresses = Object.keys(userInformation);

  // TODO: Move to state manager e.g. redux
  const fetchTransactions = async (addr) => {
    try {
      const response = await fetch(`https://blockchain.info/rawaddr/${addr}`);
      const addressInfo = await response.json();
      if (addressInfo?.error) {
        setError("Could not find Address");
      } else {
        updateUserInfo(addr, addressInfo);
        setError("");
      }
    } catch (e) {
      setError("Could not reach Server");
    }
  };

  const updateUserInfo = (addr, addrInfo) => {
    const userInfo = {
      ...userInformation,
      [addr]: addrInfo,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userInfo));
    setUserInformation(userInfo);
  };

  // Move error handleing and loading to state manager
  const addAddress = async (addr) => {
    if (!addresses.includes(addr)) {
      setLoading(true);
      await fetchTransactions(addr);
      setLoading(false);
      setCurrentAddress(addr);
    } else {
      setError("Address has already been added!");
    }
  };

  const removeAddress = () => {
    const userInfo = { ...userInformation };
    delete userInfo[currentAddress];
    setUserInformation(userInfo);
    setCurrentAddress(Object.keys(userInfo)[0] || "");
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (userInfo) {
      setCurrentAddress(Object.keys(userInfo)[0]);
      setUserInformation(userInfo);
    }
  }, []);

  return (
    <div className="py-32 flex flex-col justify-center items-center">
      <Search
        className="mb-20"
        handleSubmit={addAddress}
        loading={loading}
        error={error}
      />
      {!!addresses.length && (
        <>
          <div className="mb-4 flex">
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

          <SummarySection
            className="mb-12"
            balance={userInformation[currentAddress]?.final_balance}
          />
          <TransactionsSection
            transactions={userInformation[currentAddress]?.txs}
          />
        </>
      )}
    </div>
  );
}

export default App;
