import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 010: allowance', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let amlAdmin: SignerWithAddress;
  let treasuryAdmin: SignerWithAddress;
  let assignor: SignerWithAddress;
  let user: SignerWithAddress;
  let addresses: SignerWithAddress[];

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, amlAdmin, treasuryAdmin, assignor, user, ...addresses] = await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(AML_ADMIN, amlAdmin.address);
    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
  });

  it('approve should set the proper allowance', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(2000);
  });

  it('actual balance should not limit allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 20000);

    const balance = await BNOX.balanceOf(assignor.address);
    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(balance).to.eq(10000);
    expect(allowance).to.eq(20000);
  });

  it('blacklisted account should be able to get allowance', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);
    await BNOX.connect(assignor).approve(user.address, 2000);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(2000);
  });

  it('approve should fail if the contract is paused', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(assignor).approve(user.address, 2000)).to.be.revertedWith('Pausable: paused');
  });

  it('approve should emit Approval event', async () => {
    await expect(BNOX.connect(assignor).approve(user.address, 2000))
      .to.emit(BNOX, 'Approval')
      .withArgs(assignor.address, user.address, 2000);
  });

  it('increasing allowance should set the proper allowance', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(assignor).increaseAllowance(user.address, 1000);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(3000);
  });

  it('increasing allowance should succeed without any approval before', async () => {
    await BNOX.connect(assignor).increaseAllowance(user.address, 1000);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(1000);
  });

  it('increasing allowance should fail if the contract is paused', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.pause();

    await expect(BNOX.connect(assignor).increaseAllowance(user.address, 1000)).to.be.revertedWith('Pausable: paused');
  });

  it('increasing allowance should emit Approval event with the increased allowance value', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);

    await expect(BNOX.connect(assignor).increaseAllowance(user.address, 1000))
      .to.emit(BNOX, 'Approval')
      .withArgs(assignor.address, user.address, 3000);
  });

  it('decreasing allowance should set the proper allowance', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(assignor).decreaseAllowance(user.address, 500);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(1500);
  });

  it('decreasing allowance should fail without a sufficient actual allowance value', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);

    await expect(BNOX.connect(assignor).decreaseAllowance(user.address, 5000)).to.be.revertedWith(
      'ERC20: decreased allowance below zero'
    );
  });

  it('decreasing allowance should fail without any approval before because of unsufficient allowance value', async () => {
    await expect(BNOX.connect(assignor).decreaseAllowance(user.address, 500)).to.be.revertedWith(
      'ERC20: decreased allowance below zero'
    );
  });

  it('decreasing allowance should fail if the contract is paused', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.pause();

    await expect(BNOX.connect(assignor).decreaseAllowance(user.address, 500)).to.be.revertedWith('Pausable: paused');
  });

  it('decreasing allowance should emit Approval event with the decreased allowance value', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);

    await expect(BNOX.connect(assignor).decreaseAllowance(user.address, 500))
      .to.emit(BNOX, 'Approval')
      .withArgs(assignor.address, user.address, 1500);
  });
});
