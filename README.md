# BNOX token 

DEPLOYED

Mainnet: 0x8752bf7ad53d25a4165b9370f2becc22dd8ae838

Ropsten - UAT: 0xff01189a63a263df0a068538a168d90b94d6fd74

Rorspten - DEV: 0x3bE2b83026C48ECB65cCa0A6b666d08B7459Efbf

RinkeBy (early demo setup without KYC Admins): 0x39fe7e16220A4DBD9CCAc92cCF95e2164f831aFf 

LOGO:
https://github.com/blockben-official/bnox/blob/master/0x8752bf7ad53d25a4165b9370f2becc22dd8ae838.png

AUDIT

- Audit report from Kaspersky can be found in the audit folder


FUNCTIONAL SPECIFICATION

General requirements:
- ERC20 compatible token
- with extra standard functionalities: mint and burn
- two decimal points
- tokensymbol BNOX
- approve function is modified to prevent known front-running attacks: at creating new approve, the allowance has to be set to zero first! 

Specialities in basic functions:
- There are two black / whitelists controlling if a token can be transferred, minted or burned. 
- Both enable and disable must be available
- Whitelists are called sourceAccountWL and destinationAccountWL
- transfer (from, to, amount) should be only possible of from is sourceAccount whitelisted and to is destinationAccount whitelisted
- mint should be possible to all addresses, however only if they are destinationAccount whitelisted
- burn should be only possible if the burned account is sourceAccount whitelisted
- burn must be possible only from the treasury account
- burn does not take parameter, it burns from the treasury account automatically

Special accounts: there are three special accounts in the system:
- treasuryAddress is from where the tokens can  burned, in other adress than the treasury address, these functionalities must be denied.
- bsopoolAddress is an address where part of the token transaction fee will be transferred
- feeAddress is the second address where a part of the token transaction fee will be transferred

Transfer and token fees:
- There are two token fees at a transfer: bsoFee and generalFee
- both fees can be set dynamically
- bsoFee is transferred to the bsoFee address
- generalFee is transferred to the general Fee address
- both fees are integer numbers: 100 means 0.1 percent
- if the "from" or the "to" account is the treasury account, there should not be any fee calculted 

Administration and rights: 
- There are three groups of admins: BNOX admin, treasury admin and KYC admin
- BNOX admin can:
 - adding or removing further BNOX admin accounts
 - adding or removing further treasury admin accounts
 - adding or removing further KYC admin accounts
 - setting issueraddress
 - setting bsoFee and the related address
 - setting generalFee and the related address
 - pausing or unpausing the contract
 - destroying the contract
- Treasury admin can:
 - only treasury admins can mint tokens
 - only treasury admins can burn tokens
 - treasury admins can not do anything else priviliged apart from burn and mint
- KYC admin can:
 - whitelist accounts
 - blacklist accounts
 - treasury admins can not do anything else priviliged apart from white and blaclisting

Error scenarios and key compromise protocols:
- at error situations, the contract can paused by the admins
- if the error is fatal, a paused contract can be destroyed by the admins
- if all the administrator accounts are compromised, there is a last level of key recovery protocol: a superadmin wired at the initialization, only available on a paperwallet.  
- if only a treasury admin is compromised it can be rechanged by a BNOX admin
- if only a KYC admin is compromised it can be rechanged by a BNOX admin

QA

Test coverage:

File                  |  % Stmts | % Branch |  % Funcs |  % Lines |

contracts/           |      100 |    84.62 |      100 |      100 |   
