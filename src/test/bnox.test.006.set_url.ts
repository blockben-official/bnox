import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 006: set url', () => {
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

  it('url can be set', async () => {
    await BNOX.setUrl('http://xxx.x');

    const url = await BNOX.url();

    expect(url).to.eq('http://xxx.x');
  });

  it('setting url should emit event', async () => {
    await expect(BNOX.setUrl('http://xxx.x')).to.emit(BNOX, 'BNOXUrlSet').withArgs('http://xxx.x');
  });

  it('an BNOX admin should be able to set url', async () => {
    await BNOX.connect(BNOXAdmin).setUrl('http://xxx.x');

    const url = await BNOX.url();

    expect(url).to.eq('http://xxx.x');
  });

  it('superadmin should be able to set url', async () => {
    await BNOX.connect(superadmin).setUrl('http://xxx.x');

    const url = await BNOX.url();

    expect(url).to.eq('http://xxx.x');
  });

  it('an AML admin should not be able to set url', async () => {
    await expect(BNOX.connect(amlAdmin).setUrl('http://xxx.x')).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to set url', async () => {
    await expect(BNOX.connect(treasuryAdmin).setUrl('http://xxx.x')).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to set url', async () => {
    await expect(BNOX.connect(user).setUrl('http://xxx.x')).to.be.revertedWith('missing role');
  });
});
