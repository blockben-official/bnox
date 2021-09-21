import 'dotenv-safe/config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import abiFunctions from '../../../abi/BlockNoteX.json';
import v1Abi from './v1ABI.json';
import { BlockNoteX } from '../../../typechain/web3/BlockNoteX';
import { TransactionConfig } from 'web3-core';
import { NonPayableTx } from '../../../typechain/web3/types';
import BN from 'bn.js';
import fs from 'fs';

interface BalanceHolder {
  address: string;
  balance: BN;
}

const V1_CONTRACT_ADDRESS = '0x8752bf7AD53D25A4165b9370F2becc22dD8aE838';
const V2_CONTRACT_ADDRESS = '0x8b61F7aFe322372940dc4512BE579f0a55367650';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE_URI!));

const bnoxContractV1 = new web3.eth.Contract(v1Abi as AbiItem[], V1_CONTRACT_ADDRESS);

const bnoxContractV2 = new web3.eth.Contract(abiFunctions as AbiItem[], V2_CONTRACT_ADDRESS) as unknown as BlockNoteX;

async function getV1Tansfers(): Promise<Set<string>> {
  console.log('Fetching transfer events for BNOXv1');
  const transferEvents = await bnoxContractV1.getPastEvents('Transfer', {
    fromBlock: 9746171, // Contract creation block
  });

  console.log(`Found ${transferEvents.length} transfer events`);

  const holders = new Set<string>();
  for (const transfer of transferEvents) {
    holders.add(transfer.returnValues.from as string);
    holders.add(transfer.returnValues.to as string);
  }

  return holders;
}

async function getBalanceHolders(addresses: Set<string>): Promise<BalanceHolder[]> {
  console.log(`Fetching balances of ${addresses.size} addresses`);
  const ret: BalanceHolder[] = [];

  for (const address of addresses) {
    const balance = web3.utils.toBN(await bnoxContractV1.methods.balanceOf(address).call());

    if (balance.gt(web3.utils.toBN(0))) {
      ret.push({
        address: address,
        balance,
      });
    }
  }

  const totalSupply = ret.reduce((a, c) => a.add(c.balance), web3.utils.toBN(0));

  console.log(`There are ${ret.length} holders`);
  console.log(`Total supply ${totalSupply} BNOX`);

  return ret;
}

async function mintToV2(holders: BalanceHolder[]) {
  const treasuryAdmin = {
    address: process.env.TREASURY_ADMIN10_ADDRESS!,
    privateKey: process.env.TREASURY_ADMIN10_PRIVATEKEY!,
  };

  const startingNonce = await web3.eth.getTransactionCount(treasuryAdmin.address);

  for (let i = 0; i < holders.length; i++) {
    const actualHolder = holders[i];
    const nonce = startingNonce + i;

    const methodCall = bnoxContractV2.methods.mint(actualHolder.address, actualHolder.balance);

    const encodedABI = methodCall.encodeABI();

    const gasPrice = web3.utils.toBN(await web3.eth.getGasPrice());
    const gas = await methodCall.estimateGas({ from: treasuryAdmin.address });

    // use gasPrice * 1.11 to ensure the mining in time
    const finalGasPrice = gasPrice.mul(web3.utils.toBN(111)).div(web3.utils.toBN(100));

    const tx: TransactionConfig = {
      from: treasuryAdmin.address,
      to: V2_CONTRACT_ADDRESS,
      data: encodedABI,
      gasPrice: finalGasPrice,
      gas,
      nonce,
      value: web3.utils.numberToHex(0),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, treasuryAdmin.privateKey);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction!).catch((e) => {
      fs.appendFileSync(
        'migrationError.txt',
        `Nonce [${nonce}] Holder [${actualHolder.address}] mint [${actualHolder.balance}] gasPrice [${gasPrice}]\n`
      );
      console.error(`Something went wrong.`);
      console.error(`Address: [${actualHolder.address}] Nonce [${nonce}] balance [${actualHolder.balance}]`);
      console.error(e);
    });

    console.log(
      `Nonce [${nonce}] Holder [${actualHolder.address}] mint [${actualHolder.balance}] gasPrice [${gasPrice}] [${finalGasPrice}]`
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

async function main() {
  const addresses = await getV1Tansfers();
  const holdersWithBalance = await getBalanceHolders(addresses);
  await mintToV2(holdersWithBalance);
}

main();
