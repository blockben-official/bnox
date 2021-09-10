import { ethers, run } from 'hardhat';
import { BlockNoteX } from '../typechain';

const treasuryAddress = process.env.TREASURY_ADDRESS as string;
const BNOXAdminAddress = process.env.TOKEN_ADMIN_ADDRESS as string;
const BNOXAddress = process.env.BNOX_ADDRESS as string;

async function setupTreasuryAddress() {
  await run('compile');

  const admin = await ethers.getSigner(BNOXAdminAddress);
  const BNOX = (await ethers.getContractAt('BlockNoteX', BNOXAddress, admin)) as BlockNoteX;

  await BNOX.setTreasuryAddress(treasuryAddress);

  console.log(`Treasuy address successfully set to: ${treasuryAddress}`);
}

(async () => {
  try {
    await setupTreasuryAddress();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
