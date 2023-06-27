import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Use MetaMask provider
  web3 = new Web3(window.ethereum);
  // Request access to the user's MetaMask account
  window.ethereum.enable();
} else {
  // Fallback to a Polygon RPC endpoint
  const provider = new Web3.providers.HttpProvider(
    "https://rpc-mainnet.maticvigil.com" // Replace with the desired Polygon RPC endpoint
  );
  web3 = new Web3(provider);
}

export default web3;
