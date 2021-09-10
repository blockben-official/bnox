import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 012: transfer setup', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let treasuryAdmin: SignerWithAddress;
  let treasury: SignerWithAddress;
  let user: SignerWithAddress;
  let anotherUser: SignerWithAddress;
  let toBsoPool: SignerWithAddress;
  let toFeeAccount: SignerWithAddress;
  let addresses: SignerWithAddress[];

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, treasuryAdmin, treasury, user, anotherUser, toBsoPool, toFeeAccount, ...addresses] =
      await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
    await BNOX.setTreasuryAddress(treasury.address);
  });

  it('transfer between users is not possible without any fee address setup when fees are not zero', async () => {
    await BNOX.setBsoFee(60);
    await BNOX.setGeneralFee(40);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);

    await expect(BNOX.connect(user).transfer(anotherUser.address, 2000)).to.be.revertedWith(
      'ERC20: transfer to the zero address'
    );
  });

  it('transfer between users is possible without any fee address setup when fees are zero', async () => {
    await BNOX.setBsoFee(0);
    await BNOX.setGeneralFee(0);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);
    await BNOX.connect(user).transfer(anotherUser.address, 2000);

    const userBalance = await BNOX.balanceOf(user.address);

    expect(userBalance).to.eq(8000);
  });

  it('transfer between users is not possible without general fee address setup when general fee is not zero', async () => {
    await BNOX.setBsoFee(60);
    await BNOX.setGeneralFee(40);
    await BNOX.setBsoPoolAddress(toBsoPool.address);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);

    await expect(BNOX.connect(user).transfer(anotherUser.address, 2000)).to.be.revertedWith(
      'ERC20: transfer to the zero address'
    );
  });

  it('transfer between users is possible without general fee address setup when general fee is zero', async () => {
    await BNOX.setBsoFee(60);
    await BNOX.setGeneralFee(0);
    await BNOX.setBsoPoolAddress(toBsoPool.address);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);
    await BNOX.connect(user).transfer(anotherUser.address, 2000);

    const userBalance = await BNOX.balanceOf(user.address);

    expect(userBalance).to.eq(8000);
  });

  it('transfer between users is not possible without BSO pool address setup when BSO fee is not zero', async () => {
    await BNOX.setBsoFee(60);
    await BNOX.setGeneralFee(40);
    await BNOX.setFeeAddress(toFeeAccount.address);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);

    await expect(BNOX.connect(user).transfer(anotherUser.address, 2000)).to.be.revertedWith(
      'ERC20: transfer to the zero address'
    );
  });

  it('transfer between users is possible without BSO pool address setup when BSO fee is zero', async () => {
    await BNOX.setBsoFee(0);
    await BNOX.setGeneralFee(40);
    await BNOX.setFeeAddress(toFeeAccount.address);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);
    await BNOX.connect(user).transfer(anotherUser.address, 2000);

    const userBalance = await BNOX.balanceOf(user.address);

    expect(userBalance).to.eq(8000);
  });

  it('transfer between users is possible with proper fee address setup', async () => {
    await BNOX.setBsoFee(60);
    await BNOX.setGeneralFee(40);
    await BNOX.setBsoPoolAddress(toBsoPool.address);
    await BNOX.setFeeAddress(toFeeAccount.address);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);
    await BNOX.connect(user).transfer(anotherUser.address, 2000);

    const userBalance = await BNOX.balanceOf(user.address);

    expect(userBalance).to.eq(8000);
  });

  it('transfer from treasury is possible without any fee address setup because fees are not involved', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);
    await BNOX.connect(treasury).transfer(user.address, 2000);

    const treasuryBalance = await BNOX.balanceOf(treasury.address);
    const userBalance = await BNOX.balanceOf(user.address);

    expect(treasuryBalance).to.eq(8000);
    expect(userBalance).to.eq(2000);
  });

  it('transfer to treasury is possible without any fee address setup because fees are not involved', async () => {
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);
    await BNOX.connect(user).transfer(treasury.address, 2000);

    const userBalance = await BNOX.balanceOf(user.address);
    const treasuryBalance = await BNOX.balanceOf(treasury.address);

    expect(userBalance).to.eq(8000);
    expect(treasuryBalance).to.eq(2000);
  });
});
