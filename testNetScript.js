import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.MY_KEY;
console.log(privateKey, "privateKey");

// get foked url

let url = "http://localhost:8545";

// connect to forked mainnet
const provider = new ethers.providers.JsonRpcProvider(url);

// now get privat key and connect it to provider

const signer = new ethers.Wallet(privateKey);
console.log(signer.address);

const connectedWallet = await signer.connect(provider);

// after connecting address (signer) to mainnet or local forked mainner get the balance
const myBalance = await provider.getBalance(signer.address);
console.log(ethers.utils.formatEther(myBalance));

const transaction = {
  to: "0x840E0f2e07A52F335e956947fd2AC0f60496f891",
  value: ethers.utils.parseEther("0.1"),
};

// sending eth to address
const tx = await connectedWallet.sendTransaction(transaction);
console.log("tx sent");
await tx.wait();
console.log("tx confirmed....");
