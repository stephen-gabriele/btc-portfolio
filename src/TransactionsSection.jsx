import React from "react";
import { Fragment } from "react";
import { SATS } from "./App";

export const TransactionsSection = ({ transactions }) => {
  if (!transactions?.length) return null;

  return (
    <div>
      <div className="mb-4 text-3xl font-bold underline">Transactions</div>
      <div className="mb-4 grid grid-cols-4">
        <div className="font-semibold">Date/Time</div>
        <div className="font-semibold">Amount</div>
        <div className="font-semibold">Fee</div>
        <div className="font-semibold">Hash</div>
        {transactions.map((tx) => {
          let d = new Date(0);
          d.setUTCSeconds(tx.time);
          return (
            <Fragment key={tx.hash}>
              <div>{d.toLocaleDateString()}</div>
              <div>{tx.result / SATS} btc</div>
              <div>{tx.fee / SATS}</div>
              <div>{tx.hash.slice(0, 5)}...</div>
            </Fragment>
          );
        })}
      </div>
      {transactions.length % 50 === 0 && ( // TODO use logic based on api call, this results in bug
        <button className="focus:outline-none rounded-2xl px-4 py-2 bg-gray-600 hover:opacity-80">
          Load more
        </button>
      )}
    </div>
  );
};
