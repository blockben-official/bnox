import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';
import { BlockNoteX } from '../typechain';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 001: initial properties', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let user: SignerWithAddress;
  let addresses: SignerWithAddress[];
  let nullAddress: String = '0x0000000000000000000000000000000000000000';

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, user, ...addresses] = await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;
  });

  it('token name should be BlockNoteX', async () => {
    const tokenName = await BNOX.name();

    expect(tokenName).to.eq('BlockNoteX');
  });

  it('token symbol should be BNOX', async () => {
    const tokenSymbol = await BNOX.symbol();

    expect(tokenSymbol).to.eq('BNOX');
  });

  it('decimals should be 2', async () => {
    const decimals = await BNOX.decimals();

    expect(decimals).to.eq(2);
  });

  it('token should not be paused by default', async () => {
    const paused = await BNOX.paused();

    expect(paused).to.eq(false);
  });

  it('initial total supply should be zero', async () => {
    const totalSupply = await BNOX.totalSupply();

    expect(totalSupply).to.eq(0);
  });

  it('initial balance of the owner should be zero', async () => {
    const balance = await BNOX.balanceOf(owner.address);

    expect(balance).to.eq(0);
  });

  it('initial balance of the superadmin should be zero', async () => {
    const balance = await BNOX.balanceOf(superadmin.address);

    expect(balance).to.eq(0);
  });

  it('initial balance of a user should be zero', async () => {
    const balance = await BNOX.balanceOf(user.address);

    expect(balance).to.eq(0);
  });

  it('initial general fee should be zero', async () => {
    const generalFee = await BNOX.generalFee();

    expect(generalFee).to.eq(0);
  });

  it('initial BSO fee should be zero', async () => {
    const bsoFee = await BNOX.bsoFee();

    expect(bsoFee).to.eq(0);
  });

  it('initial fee address should be null', async () => {
    const feeAddress = await BNOX.feeAddress();

    expect(feeAddress).to.eq(nullAddress);
  });

  it('initial BSO pool address should be null', async () => {
    const bsoPoolAddress = await BNOX.bsoPoolAddress();

    expect(bsoPoolAddress).to.eq(nullAddress);
  });

  it('initial treasury address should be null', async () => {
    const treasuryAddress = await BNOX.treasuryAddress();

    expect(treasuryAddress).to.eq(nullAddress);
  });

  it('a user should not have a blacklisted source account by default', async () => {
    const isBlacklisted = await BNOX.getSourceAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('a user should not have a blacklisted destination account by default', async () => {
    const isBlacklisted = await BNOX.getDestinationAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('the owner is BNOX admin by default', async () => {
    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, owner.address);

    expect(isBNOXAdmin).to.eq(true);
  });

  it('superadmin is BNOX admin by default', async () => {
    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, superadmin.address);

    expect(isBNOXAdmin).to.eq(true);
  });

  it('a user is not BNOX admin by default', async () => {
    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, user.address);

    expect(isBNOXAdmin).to.eq(false);
  });

  it('the owner is not AML admin by default', async () => {
    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, owner.address);

    expect(isAMLAdmin).to.eq(false);
  });

  it('superadmin is AML admin by default', async () => {
    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, superadmin.address);

    expect(isAMLAdmin).to.eq(true);
  });

  it('a user is not AML admin by default', async () => {
    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, user.address);

    expect(isAMLAdmin).to.eq(false);
  });

  it('the owner is not treasury admin by default', async () => {
    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, owner.address);

    expect(isTreasuryAdmin).to.eq(false);
  });

  it('superadmin is treasury admin by default', async () => {
    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, superadmin.address);

    expect(isTreasuryAdmin).to.eq(true);
  });

  it('a user is not treasury admin by default', async () => {
    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, user.address);

    expect(isTreasuryAdmin).to.eq(false);
  });
});
