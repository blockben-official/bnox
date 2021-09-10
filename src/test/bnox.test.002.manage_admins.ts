import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BlockNoteX } from '../typechain';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import chai from 'chai';

chai.use(solidity);
const { expect } = chai;

describe('BNOX - 002: manage admins', () => {
  let BNOX: BlockNoteX;
  let owner: SignerWithAddress;
  let superadmin: SignerWithAddress;
  let BNOXAdmin: SignerWithAddress;
  let amlAdmin: SignerWithAddress;
  let treasuryAdmin: SignerWithAddress;
  let user: SignerWithAddress;
  let anotherUser: SignerWithAddress;
  let addresses: SignerWithAddress[];
  let BNOXAdminRole: string;
  let amlAdminRole: string;
  let treasuryAdminRole: string;

  const TOKEN_ADMIN = ethers.utils.id('TOKEN_ADMIN');
  const AML_ADMIN = ethers.utils.id('AML_ADMIN');
  const TREASURY_ADMIN = ethers.utils.id('TREASURY_ADMIN');

  beforeEach(async () => {
    [owner, superadmin, BNOXAdmin, amlAdmin, treasuryAdmin, user, anotherUser, ...addresses] =
      await ethers.getSigners();

    const BNOXContract = await ethers.getContractFactory('BlockNoteX', owner);
    BNOX = (await BNOXContract.deploy(superadmin.address)) as BlockNoteX;

    await BNOX.grantRole(TOKEN_ADMIN, BNOXAdmin.address);
    await BNOX.grantRole(AML_ADMIN, amlAdmin.address);
    await BNOX.grantRole(TREASURY_ADMIN, treasuryAdmin.address);

    BNOXAdminRole = await BNOX.TOKEN_ADMIN();
    amlAdminRole = await BNOX.AML_ADMIN();
    treasuryAdminRole = await BNOX.TREASURY_ADMIN();
  });

  it('a user can be set as BNOX admin', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);

    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, user.address);

    expect(isBNOXAdmin).to.eq(true);
  });

  it('adding BNOX admin should emit event', async () => {
    await expect(BNOX.grantRole(TOKEN_ADMIN, user.address))
      .to.emit(BNOX, 'RoleGranted')
      .withArgs(BNOXAdminRole, user.address, owner.address);
  });

  it('an BNOX admin should be able to add a new BNOX admin', async () => {
    await BNOX.connect(BNOXAdmin).grantRole(TOKEN_ADMIN, user.address);

    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, user.address);

    expect(isBNOXAdmin).to.eq(true);
  });

  it('superadmin should be able to add a new BNOX admin', async () => {
    await BNOX.connect(superadmin).grantRole(TOKEN_ADMIN, user.address);

    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, user.address);
    expect(isBNOXAdmin).to.eq(true);
  });

  it('an AML admin should not be able to add a new BNOX admin', async () => {
    await expect(BNOX.connect(amlAdmin).grantRole(TOKEN_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to add a new BNOX admin', async () => {
    await expect(BNOX.connect(treasuryAdmin).grantRole(TOKEN_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to add a new BNOX admin', async () => {
    await expect(BNOX.connect(user).grantRole(TOKEN_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('an BNOX admin can be removed', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);
    await BNOX.revokeRole(TOKEN_ADMIN, user.address);

    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, user.address);

    expect(isBNOXAdmin).to.eq(false);
  });

  it('removing BNOX admin should emit event', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);

    await expect(BNOX.revokeRole(TOKEN_ADMIN, user.address))
      .to.emit(BNOX, 'RoleRevoked')
      .withArgs(BNOXAdminRole, user.address, owner.address);
  });

  it('an BNOX admin should be able to remove BNOX admin', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);
    await BNOX.connect(BNOXAdmin).revokeRole(TOKEN_ADMIN, user.address);

    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, user.address);

    expect(isBNOXAdmin).to.eq(false);
  });

  it('superadmin should be able to remove BNOX admin', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);
    await BNOX.connect(superadmin).revokeRole(TOKEN_ADMIN, user.address);

    const isBNOXAdmin = await BNOX.hasRole(TOKEN_ADMIN, user.address);

    expect(isBNOXAdmin).to.eq(false);
  });

  it('an AML admin should not be able to remove BNOX admin', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);

    await expect(BNOX.connect(amlAdmin).revokeRole(TOKEN_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to remove BNOX admin', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);

    await expect(BNOX.connect(treasuryAdmin).revokeRole(TOKEN_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to remove BNOX admin', async () => {
    await BNOX.grantRole(TOKEN_ADMIN, user.address);

    await expect(BNOX.connect(anotherUser).revokeRole(TOKEN_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a user can be set as AML admin', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);

    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, user.address);

    expect(isAMLAdmin).to.eq(true);
  });

  it('adding AML admin should emit event', async () => {
    await expect(BNOX.grantRole(AML_ADMIN, user.address))
      .to.emit(BNOX, 'RoleGranted')
      .withArgs(amlAdminRole, user.address, owner.address);
  });

  it('an BNOX admin should be able to add a new AML admin', async () => {
    await BNOX.connect(BNOXAdmin).grantRole(AML_ADMIN, user.address);

    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, user.address);

    expect(isAMLAdmin).to.eq(true);
  });

  it('superadmin should be able to add a new AML admin', async () => {
    await BNOX.connect(superadmin).grantRole(AML_ADMIN, user.address);

    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, user.address);

    expect(isAMLAdmin).to.eq(true);
  });

  it('an AML admin should not be able to add a new AML admin', async () => {
    await expect(BNOX.connect(amlAdmin).grantRole(AML_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to add a new AML admin', async () => {
    await expect(BNOX.connect(treasuryAdmin).grantRole(AML_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to add a new AML admin', async () => {
    await expect(BNOX.connect(user).grantRole(AML_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('an AML admin can be removed', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);
    await BNOX.revokeRole(AML_ADMIN, user.address);

    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, user.address);

    expect(isAMLAdmin).to.eq(false);
  });

  it('removing AML admin should emit event', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);

    await expect(BNOX.revokeRole(AML_ADMIN, user.address))
      .to.emit(BNOX, 'RoleRevoked')
      .withArgs(amlAdminRole, user.address, owner.address);
  });

  it('an BNOX admin should be able to remove AML admin', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);
    await BNOX.connect(BNOXAdmin).revokeRole(AML_ADMIN, user.address);

    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, user.address);

    expect(isAMLAdmin).to.eq(false);
  });

  it('superadmin should be able to remove AML admin', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);
    await BNOX.connect(superadmin).revokeRole(AML_ADMIN, user.address);

    const isAMLAdmin = await BNOX.hasRole(AML_ADMIN, user.address);

    expect(isAMLAdmin).to.eq(false);
  });

  it('an AML admin should not be able to remove AML admin', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);

    await expect(BNOX.connect(amlAdmin).revokeRole(AML_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to remove AML admin', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);

    await expect(BNOX.connect(treasuryAdmin).revokeRole(AML_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a simple user should not be able to remove AML admin', async () => {
    await BNOX.grantRole(AML_ADMIN, user.address);

    await expect(BNOX.connect(anotherUser).revokeRole(AML_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a user can be set as treasury admin', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);

    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, user.address);

    expect(isTreasuryAdmin).to.eq(true);
  });

  it('adding treasury admin should emit event', async () => {
    await expect(BNOX.grantRole(TREASURY_ADMIN, user.address))
      .to.emit(BNOX, 'RoleGranted')
      .withArgs(treasuryAdminRole, user.address, owner.address);
  });

  it('an BNOX admin should be able to add a new treasury admin', async () => {
    await BNOX.connect(BNOXAdmin).grantRole(TREASURY_ADMIN, user.address);

    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, user.address);

    expect(isTreasuryAdmin).to.eq(true);
  });

  it('superadmin should be able to add a new treasury admin', async () => {
    await BNOX.connect(superadmin).grantRole(TREASURY_ADMIN, user.address);

    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, user.address);

    expect(isTreasuryAdmin).to.eq(true);
  });

  it('an AML admin should not be able to add a new treasury admin', async () => {
    await expect(BNOX.connect(amlAdmin).grantRole(TREASURY_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to add a new treasury admin', async () => {
    await expect(BNOX.connect(treasuryAdmin).grantRole(TREASURY_ADMIN, user.address)).to.be.revertedWith(
      'missing role'
    );
  });

  it('a simple user should not be able to add a new treasury admin', async () => {
    await expect(BNOX.connect(user).grantRole(TREASURY_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin can be removed', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);
    await BNOX.revokeRole(TREASURY_ADMIN, user.address);

    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, user.address);

    expect(isTreasuryAdmin).to.eq(false);
  });

  it('removing treasury admin should emit event', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);

    await expect(BNOX.revokeRole(TREASURY_ADMIN, user.address))
      .to.emit(BNOX, 'RoleRevoked')
      .withArgs(treasuryAdminRole, user.address, owner.address);
  });

  it('an BNOX admin should be able to remove treasury admin', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);
    await BNOX.connect(BNOXAdmin).revokeRole(TREASURY_ADMIN, user.address);

    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, user.address);

    expect(isTreasuryAdmin).to.eq(false);
  });

  it('superadmin should be able to remove treasury admin', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);
    await BNOX.connect(superadmin).revokeRole(TREASURY_ADMIN, user.address);

    const isTreasuryAdmin = await BNOX.hasRole(TREASURY_ADMIN, user.address);

    expect(isTreasuryAdmin).to.eq(false);
  });

  it('an AML admin should not be able to remove treasury admin', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);

    await expect(BNOX.connect(amlAdmin).revokeRole(TREASURY_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('a treasury admin should not be able to remove treasury admin', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);

    await expect(BNOX.connect(treasuryAdmin).revokeRole(TREASURY_ADMIN, user.address)).to.be.revertedWith(
      'missing role'
    );
  });

  it('a simple user should not be able to remove treasury admin', async () => {
    await BNOX.grantRole(TREASURY_ADMIN, user.address);

    await expect(BNOX.connect(anotherUser).revokeRole(TREASURY_ADMIN, user.address)).to.be.revertedWith('missing role');
  });

  it('the BNOXAdmin role of the superadmin should be persistent', async () => {
    await expect(BNOX.revokeRole(TOKEN_ADMIN, superadmin.address)).to.be.revertedWith('superadmin can not be changed');
  });

  it('the BNOXAdmin role of the superadmin should really be persistent', async () => {
    await expect(BNOX.revokeRole(BNOXAdminRole, superadmin.address)).to.be.revertedWith(
      'superadmin can not be changed'
    );
  });

  it('the amlAdmin role of the superadmin should be persistent', async () => {
    await expect(BNOX.revokeRole(AML_ADMIN, superadmin.address)).to.be.revertedWith('superadmin can not be changed');
  });

  it('the amlAdmin role of the superadmin should really be persistent', async () => {
    await expect(BNOX.revokeRole(amlAdminRole, superadmin.address)).to.be.revertedWith('superadmin can not be changed');
  });

  it('the treasuryAdmin role of the superadmin should be persistent', async () => {
    await expect(BNOX.revokeRole(TREASURY_ADMIN, superadmin.address)).to.be.revertedWith(
      'superadmin can not be changed'
    );
  });

  it('the treasuryAdmin role of the superadmin should really be persistent', async () => {
    await expect(BNOX.revokeRole(treasuryAdminRole, superadmin.address)).to.be.revertedWith(
      'superadmin can not be changed'
    );
  });
});
