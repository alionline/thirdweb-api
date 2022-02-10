// Importing libraries
import { ThirdwebSDK } from "@3rdweb/sdk";
// import { dotenv } from "dotenv";
import { ethers } from "ethers";

// getting the private key
require('dotenv').config()

// Instantiate 3rdweb SDK
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key
    process.env.PRIVATE_KEY,
    // This is the RPC URL for Rinkeby
    ethers.getDefaultProvider("https://rinkeby-light.eth.linkpool.io/"),
  ),
);

//instantiate the bundleModule with the contract address
export const bundleModule = sdk.getBundleDropModule('0xE50C2360499A81bCe169721614076ed9B2FC0d39')