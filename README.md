# Setup

1. `npm install`
2. `npm run dev`
3. go to the local url Vite is running the server at

# Summary

The application allows a user to input a bitcoin address and view its transactions as well as current balance.

# Upcoming Features

- "Portfolio view": Aggregating all a users balances and trasactions for each address into 1 view.
- Pagination for loading more transactions
- Search/filter to find specific transactions. For exanple, transactions <, > or between $$ or Satoshi amount
- Caching current address for a user
- prefetching next batch of transactions for a user.
- Removing addresses
- Wallet syncing
- Create a generic button components with shared styling

1. **Scope out the work to be completed:**

   1. UI that enables a user to:
      a. add multiple bitcoin addresses
      b. view a balance and transactions for a given address
      c. Change between the different addresses that were added
      d. Combined view of all the address transactions and combined balance

   Component list:

   1. Search input
   2. Summary section displaying balance in BTC and USD
   3. Transaction table allowing a user to view some details about a transaction and load more
   4. Portfolio toggle to see all addresses at once
   5. Dropdown allowing a user to view information on a different address added, and remove addresses already added

   - Storage will remain on the frontend only at the moment via localStorage. The data will be stored in a hash where the object's key is the bitcoin address and the content is the info received from blockchain.com

   Future/ideal implementation details: TBD
