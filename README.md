# BNOX token 

DEPLOYED

RinkeBy:
Ropsten:
Mainnet:

FUNCTIONAL SPECIFICATION

General requirements:
- ERC20 compatible token
- with extra standard functionalities: mint and burn
- two decimal points
- tokensymbol BNOX

Specialities in basic functions:
- There are two black / whitelists controlling if a token can be transferred, minted or burned. 
- Both enable and disable must be available
- Whitelists are called sourceAccountWL and destinationAccountWL
- transfer (from, to, amount) should be only possible of from is sourceAccount whitelisted and to is destinationAccount whitelisted
- mint should be possible to all addresses, however only if they are destinationAccoint whitelisted
- burn should be only possible if the burned account is sourceAccount whitelisted
- burn must be possible only from the treasury account

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

Administration and rights: there must be a group of admin capable of:
- adding or removing further admin accounts
- setting issueraddress
- setting bsoFee and the related address
- setting generalFee and the related address
- pausing or unpausing the contract
- destroying the contract
- there is a special admin groups, called treasury admins
- only treasury admins can mint tokens
- only treasury admins can burn tokens
- treasury admins can not do anything else priviliged apart from burn and mint

QA

Test coverage:

----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
 contracts/           |      100 |    76.92 |      100 |      100 |                |
  BNOXAdminExt.sol    |      100 |       75 |      100 |      100 |                |
  BNOXAdminRole.sol   |      100 |      100 |      100 |      100 |                |
  BNOXStandardExt.sol |      100 |    72.22 |      100 |      100 |                |
  BNOXToken.sol       |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |    76.92 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
