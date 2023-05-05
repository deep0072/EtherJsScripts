import { ethers } from "ethers";

let url = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(url);

async function sendDai(address, recipeint, amount) {
  // impersonate account

  await provider.send("anvil_impersonateAccount", [address]);
  const signer = provider.getSigner(address);

  // convert dai amount to wei units
  const daiAmount = ethers.utils.parseUnits(amount, 18);
  console.log(daiAmount);

  // Get the contract instance of the DAI token by providing its contract address and ABI
  const daiAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";

  const daiAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];

  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  // Get the number of tokens you want to send and convert them to the smallest unit of DAI
  //   const numberOfTokens = ethers.utils.parseUnits("100", 18);

  console.log(
    "vitalik dai balance is :",
    ethers.utils.formatEther(await daiContract.balanceOf(address))
  );

  console.log(
    "recipeint dai balance before transfer is :",
    ethers.utils.formatEther(await daiContract.balanceOf(recipeint))
  );

  const daiWithSigner = await daiContract.connect(signer);

  await daiWithSigner.transfer(recipeint, daiAmount);

  console.log(
    "vitalik dai balance after transfer is :",
    ethers.utils.formatEther(await daiContract.balanceOf(address))
  );

  console.log(
    "recipeint dai balance after transfer is :",
    ethers.utils.formatEther(await daiContract.balanceOf(recipeint))
  );
}

sendDai(
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  "0xDD6657c53d7c441aE4f340CF6319B7A22630F1F6",
  "500"
);
