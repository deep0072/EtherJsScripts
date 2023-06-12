import { ethers } from "ethers";
let url = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(url);

async function sendWeth(sender, recipeint, amount) {
  await provider.send("anvil_impersonateAccount", [sender]);

  const signer = provider.getSigner(sender);

  const wethAmount = ethers.utils.parseUnits(amount, 18);

  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const wethAbi = [
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

  const wethContract = new ethers.Contract(wethAddress, wethAbi, provider);

  console.log(
    "vitalik's weth balance is :",
    ethers.utils.formatEther(await wethContract.balanceOf(sender))
  );

  console.log(
    "recipeint's weth balance before transfer is :",
    ethers.utils.formatEther(await wethContract.balanceOf(recipeint))
  );

  const wethDaiWithSigner = await wethContract.connect(signer);

  await wethDaiWithSigner.transfer(recipeint, wethAmount);

  console.log(
    "vitalik's weth balance after  transfer is :",
    ethers.utils.formatEther(await wethContract.balanceOf(sender))
  );

  console.log(
    "recipeint's weth balance after  transfer is :",
    ethers.utils.formatEther(await wethContract.balanceOf(recipeint))
  );
}

sendWeth(
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  "0xDD6657c53d7c441aE4f340CF6319B7A22630F1F6",
  "1"
);
