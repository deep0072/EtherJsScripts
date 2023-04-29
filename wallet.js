import { ethers } from "ethers";
import "dotenv/config";

// create wallet using etherjs
const wallet = ethers.Wallet.createRandom();
// this will create address, mnemonic keys,and private key

console.log(wallet.address, "address");
console.log(wallet.privateKey, "privateKey");
console.log(wallet.mnemonic.phrase, "mnemonic");

/* create multiple  account with same mnenomic key using ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path);

where path  is "m/44'/60'/0'/0/x"

The most common derivation path for Ethereum is "m/44'/60'/0'/0/x", where 'x' is an index number, starting from 0, that generates different addresses. Here's a breakdown of the path components:

    m: The master node
    44': BIP44 purpose field (with hardened derivation)
    60': Ethereum's coin type (with hardened derivation)
    0': The account number (with hardened derivation)
    0: The change address (0 for external addresses, 1 for internal)
    x: The address index ==> this will let us to create multiple accounts




*/

let path, myWallet;

for (let i = 0; i < 10; i++) {
  path = `m/44'/60'/0'/0/${i}`;

  myWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path);
  console.log(`address ${i}`, myWallet.address);
  console.log(`privateKey ${i}`, myWallet.privateKey);
}

//---------------------------------------------------------------------------------

// we can create wallet from private  key also using ethers.Wallet() will also called as signer. which kind of wallet itself

const newWallet = new ethers.Wallet("your prive key");
console.log(newWallet.address, "address");

// lets sign the message that are going to broadcast in blockchain and then verify it by getting its public address

const signedMsg = await newWallet.signMessage("hi my name is Deepak"); // sign message

const signerAddress = ethers.utils.verifyMessage(
  "hi my name is Deepak",
  signedMsg
); // verify by getting signer public address

console.log("signerAddress", signerAddress);
