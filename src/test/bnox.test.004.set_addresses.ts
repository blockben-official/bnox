import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 004: set addresses', () => {
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

  const nullAddress: string = '0x0000000000000000000000000000000000000000';

  beforeEach(async () => {
    [owner, superadmin, BNOXAdmin, amlAdmin, treasuryAdmin, user, ...addresses] = await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(TOKEN_ADMIN, BNOXAdmin.address);
    await BNOX.grantRole(AML_ADMIN, amlAdmin.address);
    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
  });

  it('fee address can be set', async () => {
    await BNOX.setFeeAddress(user.address);

    const feeAddress = await BNOX.feeAddress();

    expect(feeAddress).to.eq(user.address);
  });

  it('fee address can not be set to zero address', async () => {
    await expect(BNOX.setFeeAddress(nullAddress)).to.be.revertedWith('fee address cannot be 0');
  });

  it('setting fee address should emit event', async () => {
    await expect(BNOX.setFeeAddress(user.address)).to.emit(BNOX, 'BNOXFeeAddressChange').withArgs(user.address);
  });

  it('an BNOX admin should be able to set fee address', async () => {
    await BNOX.connect(BNOXAdmin).setFeeAddress(user.address);

    const feeAddress = await BNOX.feeAddress();

    expect(feeAddress).to.eq(user.address);
  });

  it('superadmin should be able to set fee address', async () => {
    await BNOX.connect(superadmin).setFeeAddress(user.address);

    const feeAddress = await BNOX.feeAddress();

    expect(feeAddress).to.eq(user.address);
  });

  it('an AML admin should not be able to set fee address', async () => {
    await expect(BNOX.connect(amlAdmin).setFeeAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to set fee address', async () => {
    await expect(BNOX.connect(treasuryAdmin).setFeeAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to set fee address', async () => {
    await expect(BNOX.connect(user).setFeeAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('BSO pool address can be set', async () => {
    await BNOX.setBsoPoolAddress(user.address);

    const bsoPoolAddress = await BNOX.bsoPoolAddress();

    expect(bsoPoolAddress).to.eq(user.address);
  });

  it('BSO pool address can not be set to zero address', async () => {
    await expect(BNOX.setBsoPoolAddress(nullAddress)).to.be.revertedWith('bso pool address cannot be 0');
  });

  it('setting BSO pool address should emit event', async () => {
    await expect(BNOX.setBsoPoolAddress(user.address)).to.emit(BNOX, 'BNOXBsoPoolAddressChange').withArgs(user.address);
  });

  it('an BNOX admin should be able to set BSO pool address', async () => {
    await BNOX.connect(BNOXAdmin).setBsoPoolAddress(user.address);

    const bsoPoolAddress = await BNOX.bsoPoolAddress();

    expect(bsoPoolAddress).to.eq(user.address);
  });

  it('superadmin should be able to set BSO pool address', async () => {
    await BNOX.connect(superadmin).setBsoPoolAddress(user.address);

    const bsoPoolAddress = await BNOX.bsoPoolAddress();

    expect(bsoPoolAddress).to.eq(user.address);
  });

  it('an AML admin should not be able to set BSO pool address', async () => {
    await expect(BNOX.connect(amlAdmin).setBsoPoolAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to set BSO pool address', async () => {
    await expect(BNOX.connect(treasuryAdmin).setBsoPoolAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to set BSO pool address', async () => {
    await expect(BNOX.connect(user).setBsoPoolAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('treasury address can be set', async () => {
    await BNOX.setTreasuryAddress(user.address);

    const treasuryAddress = await BNOX.treasuryAddress();

    expect(treasuryAddress).to.eq(user.address);
  });

  it('treasury address can not be set to zero address', async () => {
    await expect(BNOX.setTreasuryAddress(nullAddress)).to.be.revertedWith('treasury address cannot be 0');
  });

  it('setting treasury address should emit event', async () => {
    await expect(BNOX.setTreasuryAddress(user.address))
      .to.emit(BNOX, 'BNOXTreasuryAddressChange')
      .withArgs(user.address);
  });

  it('an BNOX admin should be able to set treasury address', async () => {
    await BNOX.connect(BNOXAdmin).setTreasuryAddress(user.address);

    const treasuryAddress = await BNOX.treasuryAddress();

    expect(treasuryAddress).to.eq(user.address);
  });

  it('superadmin should be able to set treasury address', async () => {
    await BNOX.connect(superadmin).setTreasuryAddress(user.address);

    const treasuryAddress = await BNOX.treasuryAddress();

    expect(treasuryAddress).to.eq(user.address);
  });

  it('an AML admin should not be able to set treasury address', async () => {
    await expect(BNOX.connect(amlAdmin).setTreasuryAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to set treasury address', async () => {
    await expect(BNOX.connect(treasuryAdmin).setTreasuryAddress(user.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to set treasury address', async () => {
    await expect(BNOX.connect(user).setTreasuryAddress(user.address)).to.be.revertedWith('missing role');
  });
});
