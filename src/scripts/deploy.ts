import { ethers, run } from 'hardhat';
import { BlockNoteX } from '../typechain';

async function deploySmartContract() {
  await run('compile');

  const [owner] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', owner.address);

  console.log('Account balance:', (await owner.getBalance()).toString());
  const BNOXToken = await ethers.getContractFactory('BlockNoteX');
  const BNOX: BlockNoteX = (await BNOXToken.deploy()) as BlockNoteX;

  await BNOX.deployed();

  console.log(`BNOXFactory deployed! Address: ${BNOX.address}`);
}

deploySmartContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
