import { ethers } from "ethers";

let url = "http://127.0.0.1:8545";
const provider = new ethers.providers.JsonRpcProvider(url);

async function sendDai(address, recipeint, amount) {
  // impersonate account

  await provider.send("anvil_impersonateAccount", [address]);
  const signer = provider.getSigner(address);

  // convert dai amount to wei units
  const daiAmount = ethers.utils.parseUnits(amount, 18);
  console.log(daiAmount);

  // Get the contract instance of the DAI token by providing its contract address and ABI
  const LinkAddress = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
 

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

  const linkContract = new ethers.Contract(LinkAddress, daiAbi, provider);

  // Get the number of tokens you want to send and convert them to the smallest unit of DAI
  //   const numberOfTokens = ethers.utils.parseUnits("100", 18);

  console.log(
    "whale link  balance is :",
    ethers.utils.formatEther(await linkContract.balanceOf(address))
  );

  console.log(
    "recipeint link balance before transfer is :",
    ethers.utils.formatEther(await linkContract.balanceOf(recipeint))
  );

  const daiWithSigner = await linkContract.connect(signer);

  await daiWithSigner.transfer(recipeint, daiAmount);

  console.log(
    "whale link Link balance after transfer is :",
    ethers.utils.formatEther(await linkContract.balanceOf(address))
  );

  console.log(
    "recipeint Link balance after transfer is :",
    ethers.utils.formatEther(await linkContract.balanceOf(recipeint))
  );
}

sendDai(
  "0x0757e27AC1631beEB37eeD3270cc6301dD3D57D4",
  "0x6DbA090FDf7577cc18e5A5FA641b710C0b41c75e",
  "100"
);
