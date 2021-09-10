import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 014: transfer-from', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let amlAdmin: SignerWithAddress;
  let treasuryAdmin: SignerWithAddress;
  let bsoPool: SignerWithAddress;
  let feeAccount: SignerWithAddress;
  let assignor: SignerWithAddress;
  let user: SignerWithAddress;
  let anotherUser: SignerWithAddress;
  let addresses: SignerWithAddress[];

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, amlAdmin, treasuryAdmin, bsoPool, feeAccount, assignor, user, anotherUser, ...addresses] =
      await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(AML_ADMIN, amlAdmin.address);
    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
    await BNOX.setBsoPoolAddress(bsoPool.address);
    await BNOX.setFeeAddress(feeAccount.address);
  });

  it('user should be able to transfer from assignor after allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(user).transferFrom(assignor.address, user.address, 2000);

    const assignorBalance = await BNOX.balanceOf(assignor.address);
    const userBalance = await BNOX.balanceOf(user.address);

    expect(assignorBalance).to.eq(8000);
    expect(userBalance).to.eq(2000);
  });

  it('user should be able to transfer from assignor to another user after allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000);

    const assignorBalance = await BNOX.balanceOf(assignor.address);
    const anotherUserBalance = await BNOX.balanceOf(anotherUser.address);
    const userBalance = await BNOX.balanceOf(user.address);

    expect(assignorBalance).to.eq(8000);
    expect(anotherUserBalance).to.eq(2000);
    expect(userBalance).to.eq(0);
  });

  it('transfer-from should be charged as usual', async () => {
    await BNOX.setBsoFee(500);
    await BNOX.setGeneralFee(400);
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 1000000);
    await BNOX.connect(assignor).approve(user.address, 700000);
    await BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 700000);

    const assignorBalance = await BNOX.balanceOf(assignor.address);
    const anotherUserBalance = await BNOX.balanceOf(anotherUser.address);
    const bsoPoolBalance = await BNOX.balanceOf(bsoPool.address);
    const generalFeeBalance = await BNOX.balanceOf(feeAccount.address);

    expect(assignorBalance).to.eq(300000);
    expect(anotherUserBalance).to.eq(693700);
    expect(bsoPoolBalance).to.eq(3500);
    expect(generalFeeBalance).to.eq(2800);
  });

  it('transfer-from should fail without sufficient balance', async () => {
    await BNOX.connect(assignor).approve(user.address, 2000);

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000)).to.be.revertedWith(
      'ERC20: transfer amount exceeds balance'
    );
  });

  it('transfer-from should fail without any allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000)).to.be.revertedWith(
      'ERC20: transfer amount exceeds allowance'
    );
  });

  it('transfer-from should fail without sufficient allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 10000)).to.be.revertedWith(
      'ERC20: transfer amount exceeds allowance'
    );
  });

  it('increasing allowance should provide the desired allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(assignor).increaseAllowance(user.address, 4000);
    await BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 6000);

    const assignorBalance = await BNOX.balanceOf(assignor.address);
    const anotherUserBalance = await BNOX.balanceOf(anotherUser.address);

    expect(assignorBalance).to.eq(4000);
    expect(anotherUserBalance).to.eq(6000);
  });

  it('decreasing allowance should prevent transferring the previous amount of allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 6000);
    await BNOX.connect(assignor).decreaseAllowance(user.address, 2000);

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 6000)).to.be.revertedWith(
      'ERC20: transfer amount exceeds allowance'
    );
  });

  it('decreasing allowance should provide the desired allowance', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 6000);
    await BNOX.connect(assignor).decreaseAllowance(user.address, 2000);
    await BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 4000);

    const assignorBalance = await BNOX.balanceOf(assignor.address);
    const anotherUserBalance = await BNOX.balanceOf(anotherUser.address);

    expect(assignorBalance).to.eq(6000);
    expect(anotherUserBalance).to.eq(4000);
  });

  it('transfer-from should fail if the source is blacklisted', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(amlAdmin).setSourceAccountBL(assignor.address, true);

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000)).to.be.revertedWith(
      'Blacklist: sender'
    );
  });

  it('transfer-from should fail if the destination is blacklisted', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(amlAdmin).setDestinationAccountBL(anotherUser.address, true);

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000)).to.be.revertedWith(
      'Blacklist: recipient'
    );
  });

  it('blacklisted account should be able to initiate transfer if the source and destination are not blacklisted', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);
    await BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000);

    const assignorBalance = await BNOX.balanceOf(assignor.address);
    const anotherUserBalance = await BNOX.balanceOf(anotherUser.address);

    expect(assignorBalance).to.eq(8000);
    expect(anotherUserBalance).to.eq(2000);
  });

  it('transfer-from should fail if the contract is paused', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);
    await BNOX.pause();

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000)).to.be.revertedWith(
      'Pausable: paused'
    );
  });

  it('transfer-from should emit Transfer event', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 2000);

    await expect(BNOX.connect(user).transferFrom(assignor.address, anotherUser.address, 2000))
      .to.emit(BNOX, 'Transfer')
      .withArgs(assignor.address, anotherUser.address, 2000);
  });
});
