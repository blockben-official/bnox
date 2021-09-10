import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import { Contract } from 'hardhat/internal/hardhat-network/stack-traces/model';
import { BlockNoteX } from '../typechain';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 000: deploy', async () => {
  it('should not deploy with zero address in constructor', async () => {
    const [owner, ...addresses] = await ethers.getSigners();
    const nullAddress: string = '0x0000000000000000000000000000000000000000';

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    await expect(BNOXContract.deploy(nullAddress)).to.be.revertedWith('_superadmin cannot be 0');
  });
});
