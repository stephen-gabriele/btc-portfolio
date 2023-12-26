# Setup

1. `npm install`
2. `npm run dev`
3. go to the local url Vite is running the server at

# Summary

The application allows a user to input a bitcoin address and view its transactions as well as current balance.

# Features

- Adding addresse(s)
- viewing current balance
- viewing transactions
- Caching user data
- Removing addresses
- Address syncing
- Pagination for transactions (TODO)
- persisting user data (TODO)
- Search/filter to find specific transactions. For exanple, transactions <, > or between $$ or Satoshi amount or date (TODO)
- "Portfolio" view; Aggregating all a users balances and trasactions for each address into 1 view. (TODO)
- prefetching next batch of transactions for a user. (TODO)

# Optimizations

- Address syncing
  - The current implementation is problematic since it will remove all history of the previous transaction that were already fetched for a given address. Currently, this is achieved by making a new request to the API instead of using the cache, then squashing the previous data for that address in the cache (localStorage), This can be done more intelligently by fetching new transactions, checking for the first overlapping hash in the new transactions and the data that is in the cache, then only adding the new transactioins up until the overlap. This can be done since the transactions are ordered by timestamp.
- "wallet" syncing
- "Portfolio" view. It can be accomplished using blockain.com's multi address endpoint. This is not the only way to acheive such a result
- Create a generic button components with shared styling
- using global state manager (redux, mobx ...). This will help simplify React components.
- Add `PropTypes` or us `Typescript`
- Audit naming of variables and functions
- unit testing
- General UI tweaks
  - Link Hash to block on chain for easy access
  - fix abrupt loading states
  - add a loader for loading states
  - prevent content from shifting when loading of transactions are complete
  - Create a generic button components with shared styling

**Scope out the work to be completed:**

UI that enables a user to:
a. add multiple bitcoin addresses
b. view a balance and transactions for a given address
c. Change between the different addresses that were added
d. Combined view of all the address transactions and combined balance

Component list:

1.  Search input
2.  Summary section displaying balance in BTC and USD
3.  Transaction table allowing a user to view some details about a transaction and load more
4.  Portfolio toggle to see all addresses at once
5.  Dropdown allowing a user to view information on a different address added, and remove addresses already added
6.  "Remove" button

    Data Structure

    ```
    {
      userId: {
        portfolio_balance
        addresses: [
          {
            address: {
              balance
              transactions: [
                {
                  hash
                  amount
                  fee
                  timestamp
                  ...
                }
              ]
            }
          }
        ]
      }
    }
    ```

- Storage will remain on the frontend only at the moment via localStorage. The data will be stored in a hash where the object's key is the bitcoin address and the content is the info received from blockchain.com
