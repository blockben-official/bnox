import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 009: mint - burn', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let BNOXAdmin: SignerWithAddress;
  let amlAdmin: SignerWithAddress;
  let treasuryAdmin: SignerWithAddress;
  let treasury: SignerWithAddress;
  let user: SignerWithAddress;
  let addresses: SignerWithAddress[];
  let nullAddress: String = '0x0000000000000000000000000000000000000000';

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, BNOXAdmin, amlAdmin, treasuryAdmin, treasury, user, ...addresses] = await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(TOKEN_ADMIN, BNOXAdmin.address);
    await BNOX.grantRole(AML_ADMIN, amlAdmin.address);
    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
    await BNOX.setTreasuryAddress(treasury.address);
  });

  it('mint should result in a proper balance', async () => {
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);

    const balance = await BNOX.balanceOf(user.address);
    const totalSupply = await BNOX.totalSupply();

    expect(balance).to.eq(10000);
    expect(totalSupply).to.eq(10000);
  });

  it('mint should emit Transfer event from null address', async () => {
    await expect(BNOX.connect(treasuryAdmin).mint(user.address, 10000))
      .to.emit(BNOX, 'Transfer')
      .withArgs(nullAddress, user.address, 10000);
  });

  it('a treasury admin should be able to mint', async () => {
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);

    const balance = await BNOX.balanceOf(user.address);

    expect(balance).to.eq(10000);
  });

  it('an BNOX admin should not be able to mint', async () => {
    await expect(BNOX.connect(BNOXAdmin).mint(user.address, 10000)).to.be.revertedWith('missing role');
  });

  it('superadmin should be able to mint', async () => {
    await BNOX.connect(superadmin).mint(user.address, 10000);

    const balance = await BNOX.balanceOf(user.address);

    expect(balance).to.eq(10000);
  });

  it('an AML admin should not be able to mint', async () => {
    await expect(BNOX.connect(amlAdmin).mint(user.address, 10000)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to mint', async () => {
    await expect(BNOX.connect(user).mint(user.address, 10000)).to.be.revertedWith('missing role');
  });

  it('source account blacklist is not relevant on the target of minting', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);
    await BNOX.connect(treasuryAdmin).mint(user.address, 10000);

    const balance = await BNOX.balanceOf(user.address);

    expect(balance).to.eq(10000);
  });

  it('mint should fail if the address is blacklisted as a destination', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);

    await expect(BNOX.connect(treasuryAdmin).mint(user.address, 10000)).to.be.revertedWith('Blacklist: target');
  });

  it('mint should fail if the contract is paused', async () => {
    await BNOX.pause();

    await expect(BNOX.connect(treasuryAdmin).mint(user.address, 10000)).to.be.revertedWith('Pausable: paused');
  });

  it('burn should result in a proper balance of treasury', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);
    await BNOX.connect(treasuryAdmin).burn(5000);

    const balance = await BNOX.balanceOf(treasury.address);
    const totalSupply = await BNOX.totalSupply();

    expect(balance).to.eq(5000);
    expect(totalSupply).to.eq(5000);
  });

  it('burn should emit Transfer event from treasury to null address', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);

    await expect(BNOX.connect(treasuryAdmin).burn(5000))
      .to.emit(BNOX, 'Transfer')
      .withArgs(treasury.address, nullAddress, 5000);
  });

  it('a treasury admin should be able to burn', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);
    await BNOX.connect(treasuryAdmin).burn(5000);

    const balance = await BNOX.balanceOf(treasury.address);

    expect(balance).to.eq(5000);
  });

  it('an BNOX admin should not be able to burn', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);

    await expect(BNOX.connect(BNOXAdmin).burn(5000)).to.be.revertedWith('missing role');
  });

  it('superadmin should be able to burn', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);
    await BNOX.connect(superadmin).burn(5000);

    const balance = await BNOX.balanceOf(treasury.address);

    expect(balance).to.eq(5000);
  });

  it('an AML admin should not be able to burn', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);

    await expect(BNOX.connect(amlAdmin).burn(5000)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to burn', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);

    await expect(BNOX.connect(user).burn(5000)).to.be.revertedWith('missing role');
  });

  it('burn should fail without sufficient balance', async () => {
    await expect(BNOX.connect(treasuryAdmin).burn(5000)).to.be.revertedWith('ERC20: burn amount exceeds balance');
  });

  it('burn should fail if treasury is blacklisted as a source', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);
    await BNOX.connect(amlAdmin).setSourceAccountBL(treasury.address, true);

    await expect(BNOX.connect(treasuryAdmin).burn(5000)).to.be.revertedWith('Blacklist: treasury');
  });

  it('destination account blacklist is not relevant on the target of burning (treasury)', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);
    await BNOX.connect(amlAdmin).setDestinationAccountBL(treasury.address, true);
    await BNOX.connect(treasuryAdmin).burn(5000);

    const balance = await BNOX.balanceOf(treasury.address);

    expect(balance).to.eq(5000);
  });

  it('burn should fail if the contract is paused', async () => {
    await BNOX.connect(treasuryAdmin).mint(treasury.address, 10000);
    await BNOX.pause();

    await expect(BNOX.connect(treasuryAdmin).burn(5000)).to.be.revertedWith('Pausable: paused');
  });
});
