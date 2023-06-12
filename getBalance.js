import { ethers } from "ethers";
let url = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(url);

// const signer = provider.getSigner("0x840E0f2e07A52F335e956947fd2AC0f60496f891");

console.log(
  ethers.utils.formatEther(
    await provider.getBalance("0x57BcC8DA66EddceD03c9421f41405E5Aa71Dc205")
  ),
  "my balance"
);
