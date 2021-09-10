import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 003: manage blacklists', () => {
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

  it('a user can be blacklisted as a source', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);

    const isBlacklisted = await BNOX.getSourceAccountBL(user.address);

    expect(isBlacklisted).to.eq(true);
  });

  it('blocking a user as a source should emit event', async () => {
    await expect(BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true))
      .to.emit(BNOX, 'BNOXSourceAccountBL')
      .withArgs(user.address, true);
  });

  it('lots of users can be blacklisted on the source list', async () => {
    const addressList = addresses.map((a) => a.address);

    await BNOX.connect(amlAdmin).setBatchSourceAccountBL(addressList, true);

    for (const address of addressList) {
      const isBlacklisted = await BNOX.getSourceAccountBL(address);
      expect(isBlacklisted).to.eq(true);
    }
  });

  it('200 users can be blacklisted on the source list', async () => {
    const addressList = Array(200).fill(user.address);

    await BNOX.connect(amlAdmin).setBatchSourceAccountBL(addressList, true);

    for (const address of addressList) {
      const isBlacklisted = await BNOX.getSourceAccountBL(address);
      expect(isBlacklisted).to.eq(true);
    }
  });

  it('should revert when address size is larger than 200', async () => {
    const addressList = Array(201).fill(user.address);

    await expect(BNOX.connect(amlAdmin).setBatchSourceAccountBL(addressList, true)).to.be.revertedWith(
      'Batch: too many addresses'
    );
  });

  it('should revert when address size is larger than 200', async () => {
    const addressList = Array(201).fill(user.address);

    await expect(BNOX.connect(amlAdmin).setBatchDestinationAccountBL(addressList, true)).to.be.revertedWith(
      'Batch: too many addresses'
    );
  });

  it('an AML admin should be able to blacklist a user as a source', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);

    const isBlacklisted = await BNOX.getSourceAccountBL(user.address);

    expect(isBlacklisted).to.eq(true);
  });

  it('superadmin should be able to blacklist a user as a source', async () => {
    await BNOX.connect(superadmin).setSourceAccountBL(user.address, true);

    const isBlacklisted = await BNOX.getSourceAccountBL(user.address);

    expect(isBlacklisted).to.eq(true);
  });

  it('an BNOX admin should not be able to blacklist a user as a source', async () => {
    await expect(BNOX.connect(BNOXAdmin).setSourceAccountBL(user.address, true)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to blacklist a user as a source', async () => {
    await expect(BNOX.connect(treasuryAdmin).setSourceAccountBL(user.address, true)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to blacklist a user as a source', async () => {
    await expect(BNOX.connect(user).setSourceAccountBL(user.address, true)).to.be.revertedWith('missing role');
  });

  it('a user can be blacklisted as a destination', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);

    const isBlacklisted = await BNOX.getDestinationAccountBL(user.address);

    expect(isBlacklisted).to.eq(true);
  });

  it('blocking a user as a destination should emit event', async () => {
    await expect(BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true))
      .to.emit(BNOX, 'BNOXDestinationAccountBL')
      .withArgs(user.address, true);
  });

  it('an AML admin should be able to blacklist a user as a destination', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);

    const isBlacklisted = await BNOX.getDestinationAccountBL(user.address);

    expect(isBlacklisted).to.eq(true);
  });

  it('AML admin should be able to blacklist address list', async () => {
    const addressList = addresses.map((a) => a.address);

    await BNOX.connect(amlAdmin).setBatchDestinationAccountBL(addressList, true);

    for (const address of addressList) {
      const isBlacklisted = await BNOX.getDestinationAccountBL(address);

      expect(isBlacklisted).to.eq(true);
    }
  });

  it('superadmin should be able to blacklist a user as a destination', async () => {
    await BNOX.connect(superadmin).setDestinationAccountBL(user.address, true);

    const isBlacklisted = await BNOX.getDestinationAccountBL(user.address);

    expect(isBlacklisted).to.eq(true);
  });

  it('an BNOX admin should not be able to blacklist a user as a destination', async () => {
    await expect(BNOX.connect(BNOXAdmin).setDestinationAccountBL(user.address, true)).to.be.revertedWith(
      'missing role'
    );
  });

  it('a treasury admin should not be able to blacklist a user as a destination', async () => {
    await expect(BNOX.connect(treasuryAdmin).setDestinationAccountBL(user.address, true)).to.be.revertedWith(
      'missing role'
    );
  });

  it('a simple user should not be able to blacklist a user as a destination', async () => {
    await expect(BNOX.connect(user).setDestinationAccountBL(user.address, true)).to.be.revertedWith('missing role');
  });

  it('a user can be removed from the source account blacklist', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, false);

    const isBlacklisted = await BNOX.getSourceAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('unblocking a user as a source should emit event', async () => {
    await expect(BNOX.connect(amlAdmin).setSourceAccountBL(user.address, false))
      .to.emit(BNOX, 'BNOXSourceAccountBL')
      .withArgs(user.address, false);
  });

  it('an AML admin should be able to remove a user from the source account blacklist', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, false);

    const isBlacklisted = await BNOX.getSourceAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('superadmin should be able to remove a user from the source account blacklist', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);
    await BNOX.connect(superadmin).setSourceAccountBL(user.address, false);

    const isBlacklisted = await BNOX.getSourceAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('an BNOX admin should not be able to remove a user from the source account blacklist', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);

    await expect(BNOX.connect(BNOXAdmin).setSourceAccountBL(user.address, false)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to remove a user from the source account blacklist', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);

    await expect(BNOX.connect(treasuryAdmin).setSourceAccountBL(user.address, false)).to.be.revertedWith(
      'missing role'
    );
  });

  it('a simple user should not be able to remove a user from the source account blacklist', async () => {
    await BNOX.connect(amlAdmin).setSourceAccountBL(user.address, true);

    await expect(BNOX.connect(user).setSourceAccountBL(user.address, false)).to.be.revertedWith('missing role');
  });

  it('a user can be removed from the destination account blacklist', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, false);

    const isBlacklisted = await BNOX.getDestinationAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('unblocking a user as a destination should emit event', async () => {
    await expect(BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, false))
      .to.emit(BNOX, 'BNOXDestinationAccountBL')
      .withArgs(user.address, false);
  });

  it('an AML admin should be able to remove a user from the destination account blacklist', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, false);

    const isBlacklisted = await BNOX.getDestinationAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('superadmin should be able to remove a user from the destination account blacklist', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);
    await BNOX.connect(superadmin).setDestinationAccountBL(user.address, false);

    const isBlacklisted = await BNOX.getDestinationAccountBL(user.address);

    expect(isBlacklisted).to.eq(false);
  });

  it('an BNOX admin should not be able to remove a user from the destination account blacklist', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);

    await expect(BNOX.connect(BNOXAdmin).setDestinationAccountBL(user.address, false)).to.be.revertedWith(
      'missing role'
    );
  });

  it('a treasury admin should not be able to remove a user from the destination account blacklist', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);

    await expect(BNOX.connect(treasuryAdmin).setDestinationAccountBL(user.address, false)).to.be.revertedWith(
      'missing role'
    );
  });

  it('a simple user should not be able to remove a user from the destination account blacklist', async () => {
    await BNOX.connect(amlAdmin).setDestinationAccountBL(user.address, true);

    await expect(BNOX.connect(user).setDestinationAccountBL(user.address, false)).to.be.revertedWith('missing role');
  });
});
