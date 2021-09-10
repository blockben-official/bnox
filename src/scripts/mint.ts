import hre from 'hardhat';
import { BlockNoteX } from '../typechain';

async function deploySmartContract() {
  await hre.run('compile');

  const [owner] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', owner.address);

  console.log('Account balance:', (await owner.getBalance()).toString());
  const BNOXToken = await hre.ethers.getContractFactory('BlockNoteX');

  BNOXToken.connect(owner);
}

deploySmartContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
