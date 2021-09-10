import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 007: pause - unpause', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let BNOXAdmin: SignerWithAddress;
  let amlAdmin: SignerWithAddress;
  let treasuryAdmin: SignerWithAddress;
  let user: SignerWithAddress;
  let addresses: SignerWithAddress[];

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, BNOXAdmin, amlAdmin, treasuryAdmin, user, ...addresses] = await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(TOKEN_ADMIN, BNOXAdmin.address);
    await BNOX.grantRole(AML_ADMIN, amlAdmin.address);
    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
  });

  it('the contract can be paused', async () => {
    await BNOX.pause();

    const isPaused = await BNOX.paused();

    expect(isPaused).to.eq(true);
  });

  it('pausing the contract should emit event', async () => {
    await expect(BNOX.pause()).to.emit(BNOX, 'Paused').withArgs(owner.address);
  });

  it('an BNOX admin should be able to pause the contract', async () => {
    await BNOX.connect(BNOXAdmin).pause();

    const isPaused = await BNOX.paused();

    expect(isPaused).to.eq(true);
  });

  it('superadmin should be able to pause the contract', async () => {
    await BNOX.connect(superadmin).pause();

    const isPaused = await BNOX.paused();

    expect(isPaused).to.eq(true);
  });

  it('an AML admin should not be able to pause the contract', async () => {
    await expect(BNOX.connect(amlAdmin).pause()).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to pause the contract', async () => {
    await expect(BNOX.connect(treasuryAdmin).pause()).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to pause the contract', async () => {
    await expect(BNOX.connect(user).pause()).to.be.revertedWith('missing role');
  });

  it('the contract can be unpaused', async () => {
    await BNOX.pause();
    await BNOX.unpause();

    const isPaused = await BNOX.paused();

    expect(isPaused).to.eq(false);
  });

  it('unpausing the contract should emit event', async () => {
    await BNOX.pause();

    await expect(BNOX.unpause()).to.emit(BNOX, 'Unpaused').withArgs(owner.address);
  });

  it('an BNOX admin should be able to unpause the contract', async () => {
    await BNOX.pause();
    await BNOX.connect(BNOXAdmin).unpause();

    const isPaused = await BNOX.paused();

    expect(isPaused).to.eq(false);
  });

  it('superadmin should be able to unpause the contract', async () => {
    await BNOX.pause();
    await BNOX.connect(superadmin).unpause();

    const isPaused = await BNOX.paused();

    expect(isPaused).to.eq(false);
  });

  it('an AML admin should not be able to unpause the contract', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(amlAdmin).unpause()).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to unpause the contract', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(treasuryAdmin).unpause()).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to unpause the contract', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(user).unpause()).to.be.revertedWith('missing role');
  });

  it('an already paused contract cannot be paused again', async () => {
    await BNOX.pause();

    await expect(BNOX.pause()).to.be.revertedWith('Pausable: paused');
  });

  it('a not paused contract cannot be unpaused ', async () => {
    await expect(BNOX.unpause()).to.be.revertedWith('Pausable: not paused');
  });

  it('an already unpaused contract cannot be unpaused again', async () => {
    await BNOX.pause();
    await BNOX.unpause();

    await expect(BNOX.unpause()).to.be.revertedWith('Pausable: not paused');
  });
});
