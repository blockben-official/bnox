import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

/**
 * Test the kill functionality.
 *
 * Kill function has been removed in v0.0.2
 *
 * @deprecated since v0.0.2
 */
describe.skip('BNOX - 008: kill', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let BNOXAdmin: SignerWithAddress;
  let amlAdmin: SignerWithAddress;
  let treasuryAdmin: SignerWithAddress;
  let cashOut: SignerWithAddress;
  let user: SignerWithAddress;
  let addresses: SignerWithAddress[];

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, BNOXAdmin, amlAdmin, treasuryAdmin, cashOut, user, ...addresses] = await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(TOKEN_ADMIN, BNOXAdmin.address);
    await BNOX.grantRole(AML_ADMIN, amlAdmin.address);
    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
  });

  it('paused contract can be killed', async () => {
    await BNOX.pause();

    await BNOX.kill(cashOut.address);
  });

  it('not paused contract cannot be killed', async () => {
    await expect(BNOX.kill(cashOut.address)).to.be.revertedWith('Pausable: not paused');
  });

  it('an BNOX admin should be able to kill the contract', async () => {
    await BNOX.pause();

    await BNOX.connect(BNOXAdmin).kill(cashOut.address);
  });

  it('superadmin should be able to kill the contract', async () => {
    await BNOX.pause();

    await BNOX.connect(superadmin).kill(cashOut.address);
  });

  it('an AML admin should not be able to kill the contract', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(amlAdmin).kill(cashOut.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to kill the contract', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(treasuryAdmin).kill(cashOut.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to kill the contract', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(user).kill(cashOut.address)).to.be.revertedWith('missing role');
  });
});
