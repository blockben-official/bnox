import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 005: set fees', () => {
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

  it('general fee can be set', async () => {
    await BNOX.setGeneralFee(60);

    const generalFee = await BNOX.generalFee();

    expect(generalFee).to.eq(60);
  });

  it('setting general fee should emit event', async () => {
    await expect(BNOX.setGeneralFee(50)).to.emit(BNOX, 'BNOXGeneralFeeChange').withArgs(50);
  });

  it('an BNOX admin should be able to set general fee', async () => {
    await BNOX.connect(BNOXAdmin).setGeneralFee(60);

    const generalFee = await BNOX.generalFee();

    expect(generalFee).to.eq(60);
  });

  it('superadmin should be able to set general fee', async () => {
    await BNOX.connect(superadmin).setGeneralFee(60);

    const generalFee = await BNOX.generalFee();

    expect(generalFee).to.eq(60);
  });

  it('an AML admin should not be able to set general fee', async () => {
    await expect(BNOX.connect(amlAdmin).setGeneralFee(60)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to set general fee', async () => {
    await expect(BNOX.connect(treasuryAdmin).setGeneralFee(60)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to set general fee', async () => {
    await expect(BNOX.connect(user).setGeneralFee(60)).to.be.revertedWith('missing role');
  });

  it('BSO fee can be set', async () => {
    await BNOX.setBsoFee(40);

    const bsoFee = await BNOX.bsoFee();

    expect(bsoFee).to.eq(40);
  });

  it('setting BSO fee should emit event', async () => {
    await expect(BNOX.setBsoFee(30)).to.emit(BNOX, 'BNOXBsoFeeChange').withArgs(30);
  });

  it('an BNOX admin should be able to set BSO fee', async () => {
    await BNOX.connect(BNOXAdmin).setBsoFee(60);

    const bsoFee = await BNOX.bsoFee();

    expect(bsoFee).to.eq(60);
  });

  it('superadmin should be able to set BSO fee', async () => {
    await BNOX.connect(superadmin).setBsoFee(60);

    const bsoFee = await BNOX.bsoFee();

    expect(bsoFee).to.eq(60);
  });

  it('an AML admin should not be able to set BSO fee', async () => {
    await expect(BNOX.connect(amlAdmin).setBsoFee(60)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to set BSO fee', async () => {
    await expect(BNOX.connect(treasuryAdmin).setBsoFee(60)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to set BSO fee', async () => {
    await expect(BNOX.connect(user).setBsoFee(60)).to.be.revertedWith('missing role');
  });
});
