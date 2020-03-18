pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Roles.sol";
import "./BNOXAdminExt.sol";

/// @author Blockben
/// @title BNOXToken standard extentions for the token functionalities
/// @notice BNOXToken extentions for mint, burn and kill
contract BNOXStandardExt is BNOXAdminExt, ERC20 {

    // constructor delegating superadmin role to the BNOXAdminRole
    constructor (address superadmin) BNOXAdminExt(superadmin) internal {
    }

    /// @notice transfer BNOX token, only if not paused
    /// @dev ...
    /// @param to The address of the account to be transferred
    /// @param value The amount of token to be transferred
    /// @return true if everything is cool
    function transfer(address to, uint256 value) public whenNotPaused returns (bool) {
        _transfer(_msgSender(), to, value);
        return true;
    }

    /// @notice transferFrom BNOX token, only if not paused
    /// @dev ...
    /// @param from The address transferred from
    /// @param to The amount transferred to
    /// @param value The amount of token to be transferred
    function transferFrom(address from, address to, uint256 value) public whenNotPaused returns (bool) {
        return super.transferFrom(from, to, value);
    }

    /// @notice approve BNOX token to be moved with tranferFrom, only if not paused
    /// @dev ...
    /// @param spender The address to be approved
    /// @param value The amount of token to be allowed to be transferred
    function approve(address spender, uint256 value) public whenNotPaused returns (bool) {
        require((value == 0) || (allowance(msg.sender, spender) == 0), "approve must be set to zero first");
        return super.approve(spender, value);
    }

    /// @notice increase approved BNOX token, only if not paused
    /// @dev ...
    /// @param spender The address to be approved
    /// @param addedValue The amount of token to be allowed to be transferred
    function increaseAllowance(address spender, uint256 addedValue) public whenNotPaused returns (bool) {
        return super.increaseAllowance(spender, addedValue);
    }

    /// @notice decrease approved BNOX token, only if not paused
    /// @dev ...
    /// @param spender The address to be approved
    /// @param subtractedValue The amount of token to be allowed to be transferred
    function decreaseAllowance(address spender, uint256 subtractedValue) public whenNotPaused returns (bool) {
        return super.decreaseAllowance(spender, subtractedValue);
    }


    /// @notice mint BNOX token, only Treasury admin, only if no paused
    /// @dev ...
    /// @param account The address of the account to be minted
    /// @param amount The amount of token to be minted
    /// @return true if everything is cool
    function mint(address account, uint256 amount) external onlyTreasuryAdmin whenNotPaused returns (bool) {
        _mint(account, amount);
        return true;
    }

    /// @notice burning BNOX token from the treasury account, only if not paused
    /// @dev ...
    /// @param amount The amount of token to be burned
    function burn(uint256 amount) external onlyTreasuryAdmin whenNotPaused {
        require(getSourceAccountWL(treasuryAddress) == true, "Treasury address is locked by the source account whitelist");
        _burnFrom(treasuryAddress, amount);
    }

    /// @notice killing the contract, only paused contract can be killed by the admin
    /// @dev ...
    /// @param toChashOut The address where the ether of the token should be sent
    function kill(address payable toChashOut) external onlyBNOXAdmin {
        require (paused == true, "only paused contract can be killed");
        selfdestruct(toChashOut);
    }

    /// @notice mint override to consider address lock for KYC
    /// @dev ...
    /// @param account The address where token is mineted
    /// @param amount The amount to be minted
    function _mint(address account, uint256 amount) internal {
        require(getDestinationAccountWL(account) == true, "Target account is locked by the destination account whitelist");

        super._mint(account, amount);
    }

    /// @notice transfer override to consider locks for KYC
    /// @dev ...
    /// @param sender The address from where the token sent
    /// @param recipient Recipient address
    /// @param amount The amount to be transferred
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(getSourceAccountWL(sender) == true, "Sender account is not unlocked by the source account whitelist");
        require(getDestinationAccountWL(recipient) == true, "Target account is not unlocked by the destination account whitelist");
        require(getDestinationAccountWL(feeAddress) == true, "General fee account is not unlocked by the destination account whitelist");
        require(getDestinationAccountWL(bsopoolAddress) == true, "Bso pool account is not unlocked by the destination account whitelist");

        // transfer to the trasuryAddress or transfer from the treasuryAddress do not cost transaction fee
        if((sender == treasuryAddress) || (recipient == treasuryAddress)){
            super._transfer(sender, recipient, amount);
        }
        else {

            // three decimal in percent
            // The decimalcorrection is 100.000, but to avoid rounding errors, first use 10.000 and
            // where we use decimalCorrection the calculation must add 5 and divide 10 at the and
            uint256 decimalCorrection = 10000;

            // calculate and transfer fee
            uint256 generalFee256 = generalFee;

            uint256 bsoFee256 = bsoFee;

            uint256 totalFee = generalFee256.add(bsoFee256);

            // To avoid rounding errors add 5 and then div by 10. Read comment at decimalCorrection
            uint256 amountTotal = amount.mul(totalFee).div(decimalCorrection).add(5).div(10);

            // To avoid rounding errors add 5 and then div by 10. Read comment at decimalCorrection
            uint256 amountBso = amount.mul(bsoFee256).div(decimalCorrection).add(5).div(10);

            uint256 amountGeneral = amountTotal.sub(amountBso);

            uint256 amountRest = amount.sub(amountTotal);

            super._transfer(sender, recipient, amountRest);
            super._transfer(sender, feeAddress, amountGeneral);
            super._transfer(sender, bsopoolAddress, amountBso);
        }
    }
}