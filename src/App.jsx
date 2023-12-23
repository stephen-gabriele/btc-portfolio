import { useState } from "react";
import "./App.css";
import { Search } from "./Search";
import { TransactionsSection } from "./TransactionsSection";
import { ButtonSwitch } from "./ButtonSwitch";
import { AddressSelector } from "./AddressSelector";
import { SummarySection } from "./SummarySection";

// TODO: get live BTC price
export const BTC_PRICE = 43_435;
export const SATS = 100_000_000;

function App() {
  const [currentAddress, setCurrentAddress] = useState("");
  const [addressData, setAddressData] = useState();
  const [addresses, setAddresses] = useState([]);
  const [portfolioMode, setPortfolioMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // TODO: Move to state manager e.g. redux
  const fetchTransactions = async (addr) => {
    try {
      const response = await fetch(`https://blockchain.info/rawaddr/${addr}`);
      const addressInfo = await response.json();
      setAddressData(addressInfo);
      setError(false);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  // Move error handleing and loading to state manager
  const onSubmit = async (addr) => {
    if (!addresses.includes(addr)) {
      setLoading(true);
      const savedAddr = JSON.parse(localStorage.getItem(addr));
      if (savedAddr) {
        setAddressData(savedAddr);
        setError(false);
      } else {
        await fetchTransactions(addr);
      }
      setLoading(false);
      setCurrentAddress(addr);
      setAddresses([...addresses, addr]);
    } else {
      setError(true);
    }
  };

  return (
    <div className="py-32">
      <Search
        className="mb-20"
        handleSubmit={onSubmit}
        loading={loading}
        error={error}
      />
      {!!addresses.length && (
        <>
          <div className="mb-4 flex">
            <AddressSelector
              addresses={addresses}
              currentAddress={currentAddress}
              disabled={!addresses.length || portfolioMode}
            />
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
            balance={addressData?.final_balance}
          />
          <TransactionsSection transactions={addressData?.txs} />
        </>
      )}
    </div>
  );
}

export default App;
