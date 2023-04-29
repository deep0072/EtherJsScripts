import { ethers } from "ethers";


let url = "http://localhost:8545";
const provider = new ethers.JsonRpcProvider(url);

// this give exact blocknumber as we check on etherscan
console.log("block nunber", await provider.getBlockNumber());

// if we want to get the real address by pasing ens name
console.log("real address", await provider.resolveName("vitalik.eth"));

// convert address to ens name

console.log(
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 ens name is ",
  await provider.lookupAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
);

// get balance of perticular account in wei.

let vitalikBalance = (await provider.getBalance("vitalik.eth")).toString();

// if want to get exact value we can use here formatEther method .

console.log("fromattedEther", ethers.formatEther(vitalikBalance));

// convert exact amount of eth in wei. exact opposite of formatether function
console.log(
  "5149.649178668714 eth in wei is",
  ethers.parseEther("5149.649178668714").toString()
);

// compare the balance
let vitalikBalancess = await provider.getBalance("vitalik.eth");
let deepBalance = await provider.getBalance(
  "0x840E0f2e07A52F335e956947fd2AC0f60496f891"
);
console.log("vitalikBalancess", typeof vitalikBalancess);

if (vitalikBalancess > deepBalance) {
  console.log("deepBalance is greater than vitalikBalances");
} else {
  console.log("vitalikBalances is greater than deepBalance");
}

// add number in bigNumber using .add() method
let newDeepBalance = deepBalance + ethers.parseEther("50");
console.log(newDeepBalance, "newDeepbalance");
