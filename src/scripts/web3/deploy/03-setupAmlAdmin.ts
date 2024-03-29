import 'dotenv-safe/config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import abiFunctions from '../../../abi/BlockNoteX.json';
import { BlockNoteX } from '../../../typechain/web3/BlockNoteX';
import { TransactionConfig } from 'web3-core';
import { NonPayableTx } from '../../../typechain/web3/types';

const ROLE_NAME = 'AML_ADMIN';

async function setAMLAdmin() {
  console.log(`Start setting up ${ROLE_NAME}...`);

  const amlAdminsEnvList = [
    `${ROLE_NAME}1_ADDRESS`,
    `${ROLE_NAME}2_ADDRESS`,
    `${ROLE_NAME}3_ADDRESS`,
    `${ROLE_NAME}4_ADDRESS`,
    `${ROLE_NAME}5_ADDRESS`,
    `${ROLE_NAME}6_ADDRESS`,
    `${ROLE_NAME}7_ADDRESS`,
    `${ROLE_NAME}8_ADDRESS`,
    `${ROLE_NAME}9_ADDRESS`,
    `${ROLE_NAME}10_ADDRESS`,
  ];
  const tokenAdminRole = Web3.utils.keccak256(ROLE_NAME);

  const deployer = {
    address: process.env.DEPLOYER_ADDRESS!,
    privateKey: process.env.DEPLOYER_PRIVATEKEY!,
  };

  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE_URI!));

  const contract = new web3.eth.Contract(
    abiFunctions as AbiItem[],
    process.env.CONTRACT_ADDRESS
  ) as unknown as BlockNoteX;

  for (const amlAdmin of amlAdminsEnvList) {
    console.log(`Grant role ${ROLE_NAME} to address ${process.env[amlAdmin]}`);
    const setAdminCall = contract.methods.grantRole(tokenAdminRole, process.env[amlAdmin]!);
    const encodedABI = setAdminCall.encodeABI();

    let gasPrice = web3.utils.toBN('300000000000'); // 300 gwei

    // Check if gasPrice is more than 70 GWEI
    while (gasPrice.gte(web3.utils.toBN('70000000000'))) {
      gasPrice = web3.utils.toBN(await web3.eth.getGasPrice());

      console.log(`Actual gas price: ${gasPrice.div(web3.utils.toBN('1000000000'))} GWEI`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`Gas price is low enough ${gasPrice}, let's rock!`);

    const nonPayableTx: NonPayableTx = {
      from: deployer.address,
      to: process.env.CONTRACT_ADDRESS!,
      data: encodedABI,
    };

    console.log('Calculating gas');
    const gas = await setAdminCall.estimateGas(nonPayableTx);
    console.log('Calculating gas finished');

    const tx = {
      ...nonPayableTx,
      gas,
    } as TransactionConfig;

    console.log('TX has been created. Signin...');

    const signedTx = await web3.eth.accounts.signTransaction(tx, deployer.privateKey);

    console.log('TX has been signed, calling method on blockchain');

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

    console.log(receipt);
  }
}

setAMLAdmin()
  .then((e) => {
    console.log(e);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
