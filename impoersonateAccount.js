import { ethers } from "ethers";
let url = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(url);

async function impersonateAccount(address, targetAddress, amount) {
  // Impersonate the account
  await provider.send("anvil_impersonateAccount", [address]);

  // Create a signer for the impersonated account
  const signer = provider.getSigner(address);

  // Send a transaction from the impersonated account
  const tx = await signer.sendTransaction({
    to: targetAddress,
    value: ethers.utils.parseEther(amount),
  });

  await tx.wait();

  console.log(`Sent ${amount} ETH from ${address} to ${targetAddress}`);
}

const addressToImpersonate = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const targetAddress = "0xDD6657c53d7c441aE4f340CF6319B7A22630F1F6";
const amount = "1000";

impersonateAccount(addressToImpersonate, targetAddress, amount);
console.log(
  ethers.utils.formatEther(
    await provider.getBalance("0xd8da6bf26964af9d7eed9e03e53415d37aa96045")
  )
);
