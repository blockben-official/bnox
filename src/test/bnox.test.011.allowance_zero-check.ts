import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 011: allowance zero-check', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
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
    [owner, superadmin, treasuryAdmin, bsoPool, feeAccount, assignor, user, anotherUser, ...addresses] =
      await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);
    await BNOX.setBsoPoolAddress(bsoPool.address);
    await BNOX.setFeeAddress(feeAccount.address);
  });

  it('approve should fail if there is a non-zero actual allowance value', async () => {
    await BNOX.connect(assignor).approve(user.address, 4000);

    await expect(BNOX.connect(assignor).approve(user.address, 3000)).to.be.revertedWith('Approve: zero first');
  });

  it('approving zero amount should succeed even if there is a non-zero actual allowance value', async () => {
    await BNOX.connect(assignor).approve(user.address, 4000);
    await BNOX.connect(assignor).approve(user.address, 0);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(0);
  });

  it('approve should succeed if the previous non-zero allowance was set to zero before', async () => {
    await BNOX.connect(assignor).approve(user.address, 4000);
    await BNOX.connect(assignor).approve(user.address, 0);
    await BNOX.connect(assignor).approve(user.address, 3000);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(3000);
  });

  it('approve should succeed if the previous non-zero allowance was decreased to zero before', async () => {
    await BNOX.connect(assignor).approve(user.address, 4000);
    await BNOX.connect(assignor).decreaseAllowance(user.address, 4000);
    await BNOX.connect(assignor).approve(user.address, 3000);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(3000);
  });

  it('approve should fail if there is a non-zero actual allowance value even if there was some decrease before', async () => {
    await BNOX.connect(assignor).approve(user.address, 4000);
    await BNOX.connect(assignor).decreaseAllowance(user.address, 1000);

    await expect(BNOX.connect(assignor).approve(user.address, 2000)).to.be.revertedWith('Approve: zero first');
  });

  it('approve should succeed if the previous non-zero allowance was fully transferred before', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 4000);
    await BNOX.connect(user).transferFrom(assignor.address, user.address, 4000);
    await BNOX.connect(assignor).approve(user.address, 3000);

    const allowance = await BNOX.allowance(assignor.address, user.address);

    expect(allowance).to.eq(3000);
  });

  it('approve should fail if there is a non-zero actual allowance value even if the previous allowance was partially transferred before', async () => {
    await BNOX.connect(treasuryAdmin).mint(assignor.address, 10000);
    await BNOX.connect(assignor).approve(user.address, 4000);
    await BNOX.connect(user).transferFrom(assignor.address, user.address, 1000);

    await expect(BNOX.connect(assignor).approve(user.address, 2000)).to.be.revertedWith('Approve: zero first');
  });
});
