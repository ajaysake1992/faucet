Section 7)

Call function by signature - 

Notes - 
Function types - 

external
payable
view - will not alter storage state any way (not required gas fees)
pure - not even read the stroage state (not required gas fees)


-----------------------------------------------------------------------------------------------------------

Section 8)

Smart contract functions

Note - 
Funders
address - data type to store users/funders address
msg - special keyword in solidity which hold metadata about transaction like sender

public - varibale we can call it as funtion from outside to get value

memory or calldata - whenever we return data from function we need to mark it as memonry or calldata

public vs external - almost same from outside but external function can not call from inside of smart contract

Generally it's good practise to mark function extrenal if only call from outside but we can still call it using this keyword but with high gas 


