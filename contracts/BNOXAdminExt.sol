pragma solidity ^0.5.0;

import "./BNOXAdminRole.sol";

/// @author Blockben
/// @title BNOXToken KYC specific extentions of the token functionalities
/// @notice BNOXToken extentions for handling source and destination KYC
contract BNOXAdminExt is BNOXAdminRole {

    /// @notice administrating locks for the source contracts
    mapping(address => bool) private _sourceAccountWL;

    /// @notice administrating locks for the destination contracts
    mapping(address => bool) private _destinationAccountWL;

    /// @notice url for external verification
    string public url;

    /// @notice addres for collecting and burning tokens
    address public treasuryAddress;

    /// @notice addres for fee
    address public feeAddress;

    /// @notice addres for bsopool
    address public bsopoolAddress;

    /// @notice general transaction fee
    uint16 public generalFee;

    /// @notice bso transaction fee
    uint16 public bsoFee;

    /// @notice basic functionality can be paused
    bool public paused;

    /// @notice Event for locking or unlocking a source account
    event BNOXSourceAccountWL(address indexed account, bool lockValue);
    /// @notice Event for locking or unlocking a destination account
    event BNOXDestinationAccountWL(address indexed account, bool lockValue);
    /// @notice Event for locking or unlocking a destination account
    event BNOXUrlSet(string ulr);
    /// @notice Event for changing the terasury address
    event BNOXTreasuryAddressChange(address newAddress);
    /// @notice Event for changing the fee address
    event BNOXFeeAddressChange(address newAddress);
    /// @notice Event for changing the bsopool address
    event BNOXBSOPOOLAddressChange(address newAddress);
    /// @notice Event for changing the general fee
    event BNOXGeneralFeeChange(uint256 newFee);
    /// @notice Event for changing the bso fee
    event BNOXBSOFeeChange(uint256 newFee);
    /// @notice Token is paused by the account
    event BNOXPaused(address account);
    /// @notice Token is un-paused by the account
    event BNOXUnpaused(address account);

    // constructor setting the contract unpaused and delegating the superadmin
    constructor (address superadmin) BNOXAdminRole(superadmin) internal {
        paused = false;
    }

    /// @notice Modifier only if not paused
    modifier whenNotPaused() {
        require(!paused, "Pausable: paused");
        _;
    }

    /// @notice getting if an address is locked as a source address
    /// @dev ...
    /// @param sourceAddress The address of the account to be checked
    function getSourceAccountWL(address sourceAddress) public view returns (bool) {
        return _sourceAccountWL[sourceAddress];
    }

    /// @notice getting if an address is locked as a destinationAddress
    /// @dev ...
    /// @param destinationAddress The address of the account to be checked
    function getDestinationAccountWL(address destinationAddress) public view returns (bool) {
        return _destinationAccountWL[destinationAddress];
    }

    /// @notice setting if an address is locked as a source address
    /// @dev ...
    /// @param sourceAddress The address of the account to be checked
    function setSourceAccountWL(address sourceAddress, bool lockValue) public onlyKYCAdmin {
        _sourceAccountWL[sourceAddress] = lockValue;
        emit BNOXSourceAccountWL(sourceAddress, lockValue);
    }

    /// @notice setting if an address is locked as a destination address
    /// @dev ...
    /// @param destinationAddress The address of the account to be checked
    function setDestinationAccountWL(address destinationAddress, bool lockValue) public onlyKYCAdmin {
        _destinationAccountWL[destinationAddress] = lockValue;
        emit BNOXDestinationAccountWL(destinationAddress, lockValue);
    }

    /// @notice setting the url referring to the documentation
    /// @dev ...
    /// @param newUrl The new url
    function setUrl(string memory newUrl) public onlyBNOXAdmin {
        url = newUrl;
        emit BNOXUrlSet(newUrl);
    }

    /// @notice setting a new address for treasuryAddress
    /// @dev ...
    /// @param newAddress The new address to set
    function setTreasuryAddress(address newAddress) public onlyBNOXAdmin {
        treasuryAddress = newAddress;
        emit BNOXTreasuryAddressChange(newAddress);
    }

    /// @notice setting a new address for feeAddress
    /// @dev ...
    /// @param newAddress The new address to set
    function setFeeAddress(address newAddress) public onlyBNOXAdmin {
        feeAddress = newAddress;
        emit BNOXFeeAddressChange(newAddress);
    }

    /// @notice setting a new address for feeAddress
    /// @dev ...
    /// @param newAddress The new address to set
    function setBsopoolAddress(address newAddress) public onlyBNOXAdmin {
        bsopoolAddress = newAddress;
        emit BNOXBSOPOOLAddressChange(newAddress);
    }

    /// @notice setting a new general fee
    /// @dev ...
    /// @param newFee The new fee to set
    function setGeneralFee(uint16 newFee) public onlyBNOXAdmin {
        generalFee = newFee;
        emit BNOXGeneralFeeChange(newFee);
    }

    /// @notice setting a new bsoFee fee
    /// @dev ...
    /// @param newFee The new fee to set
    function setBsoFee(uint16 newFee) public onlyBNOXAdmin {
        bsoFee = newFee;
        emit BNOXBSOFeeChange(newFee);
    }

    /// @notice pause the contract
    /// @dev ...
    function pause() public onlyBNOXAdmin {
        require(paused == false, "The contract is already paused");
        paused = true;
        emit BNOXPaused(_msgSender());
    }

    /// @notice un-pause the contract
    /// @dev ...
    function unpause() public onlyBNOXAdmin {
        paused = false;
        emit BNOXUnpaused(_msgSender());
    }

}