# Bitso Challenge

## Overview

This decentralized application (dApp) allows users to interact with an ERC-20 token deployed on the Sepolia testnet. Users can connect their wallet, view their token balance, and transfer tokens to other Ethereum addresses.

## Features

- **Wallet Connection**: Users can connect their Ethereum wallet to the application.
- **Balance Display**: Once connected, users can view their ERC-20 token balance.
- **Token Transfer**: Users can send tokens to other Ethereum addresses.
- **Gas Estimation**: The app provides gas fee estimates for transactions.
- **Wallet Disconnection**: Users can disconnect their wallet at any time.

## Technology Stack

- **Frontend**: React.js with Next.js
- **Ethereum Interaction**: Rainbow, wagmi, viem
- **Styling**: Tailwind CSS
- **Smart Contract**: Solidity (ERC-20 standard)

## Prerequisites

- Node.js (v18.0.0 or later)
- npm
- MetaMask or any other Ethereum wallet browser extension

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/lucasbara/bitso-challenge.git
   cd bitso-challenge
   ```

2. Install dependencies:

   ```
   npm install

   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser to use the application.

## Smart Contract

The ERC-20 token contract is deployed on the Sepolia testnet.

## Author

Coded by Lucas Barallobre.
