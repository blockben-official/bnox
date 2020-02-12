pragma solidity ^0.5.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/access/Roles.sol";

/// @author BlockBen
/// @title BNOXToken Adminrole
/// @notice BNOXToken Adminrole implementation
contract BNOXAdminRole is Context {
    using Roles for Roles.Role;

    /// @notice superadmin on paper wallet for worst case key compromise
    address private _superadmin;

    /// @notice list (mapping) of BNOX admins
    Roles.Role private _BNOXAdmins;

    /// @notice list (mapping) of Treasury admins can only min or burn
    Roles.Role private _TreasuryAdmins;

    /// @notice Event for Admin addedd
    event BNOXAdminAdded(address indexed account);
    /// @notice Event for Admin removed
    event BNOXAdminRemoved(address indexed account);
    /// @notice Event for adding treasury admin
    event BNOXTreasuryAdminAdded(address indexed account);
    /// @notice Event for rmoving treasury admin
    event BNOXTreasuryAdminRemoved(address indexed account);

    // constructor setting the superadmin and adding deployer as admin
    constructor (address superadmin) internal {
        _superadmin = superadmin;
        _addBNOXAdmin(_msgSender());
    }

    /// @notice Modifyer checking if the caller is a BNOX admin
    modifier onlyBNOXAdmin() {
        require((isBNOXAdmin(_msgSender()) || (_msgSender() == _superadmin)), "BNOXAdmin: caller does not have the BNOXAdmin role");
        _;
    }

    /// @notice Modifyer checking if the caller is a Treasury
    modifier onlyTreasuryAdmin() {
        require(isTreasuryAdmin(_msgSender()), "Treasury admin: caller does not have the TreasuryAdmin role");
        _;
    }

    /// @notice Checking if the address is a Treasury admin
    /// @dev ...
    /// @param account The address of the account to be checked
    /// @return true if the account is a treasury admin
    function isTreasuryAdmin(address account) public view returns (bool) {
        return _TreasuryAdmins.has(account);
    }

    /// @notice Checking if the address is a BNOX admin
    /// @dev ...
    /// @param account The address of the account to be checked
    /// @return true if the account is an admin
    function isBNOXAdmin(address account) public view returns (bool) {
        return _BNOXAdmins.has(account);
    }

    /// @notice Adding an account as a BNOX admin
    /// @dev ...
    /// @param account The address of the account to be added
    function addBNOXAdmin(address account) public onlyBNOXAdmin {
        _addBNOXAdmin(account);
    }

    /// @notice Removing an account as a BNOX admin
    /// @dev ...
    /// @param account The address of the account to be added
    function removeBNOXAdmin(address account) public onlyBNOXAdmin {
        _removeBNOXAdmin(account);
    }

    /// @notice adding an account as a BNOX admin internal
    /// @dev ...
    /// @param account The address of the account to be added
    function _addBNOXAdmin(address account) internal {
        _BNOXAdmins.add(account);
        emit BNOXAdminAdded(account);
    }

    /// @notice Removing an account as a BNOX admin internal
    /// @dev ...
    /// @param account The address of the account to be removed
    function _removeBNOXAdmin(address account) internal {
        _BNOXAdmins.remove(account);
        emit BNOXAdminRemoved(account);
    }

    /// @notice Adding an account as a Treasury admin
    /// @dev ...
    /// @param account The address of the account to be added
    function addTreasuryAdmin(address account) public onlyBNOXAdmin {
        _addTreasuryAdmin(account);
    }

    /// @notice Removing an account as a Treasury admin
    /// @dev ...
    /// @param account The address of the account to be removed
    function removeTreasuryAdmin(address account) public onlyBNOXAdmin {
        _removeTreasuryAdmin(account);
    }

    /// @notice adding an account as a Treasury admin internal
    /// @dev ...
    /// @param account The address of the account to be added
    function _addTreasuryAdmin(address account) internal {
        _TreasuryAdmins.add(account);
        emit BNOXTreasuryAdminAdded(account);
    }

    /// @notice Removing an account as a BNOX admin internal
    /// @dev ...
    /// @param account The address of the account to be removed
    function _removeTreasuryAdmin(address account) internal {
        _TreasuryAdmins.remove(account);
        emit BNOXTreasuryAdminRemoved(account);
    }

}