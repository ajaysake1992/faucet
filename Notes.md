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


Section 9) Memory

Notes -

assembly {} - we can write low level language code

Access modifiers -

1) public - outside of contract
2) private - within smart contract
3) internal - within smart contract and can be derived


Section 10) Storage

In solididty varibles are stored in array slot of size 32. So because of this orders of defining variables matter a lot in smart contract to use slot efficiently in order to lower down gas fee for deployment of SC and perform a transaction.

uint8 public  a = 7 ===> 8 bits = 1 byte memory
uint16 public  b = 15 ===> 8 bits = 1 byte memory,So 2 byte
address public  c = Ox222dgdg20303030303 ===> 20 bytes
bool d = true ===> 1 byte
uint64 public  c = 15 ===> 64/8 === 8 byte
Total = 32 bytes ===> stored in 0 slot
[[0], [1]....]


to check storage, need to access insatnce of contract or use getStorgeAt("contrac address", slot_nu) metid of
web3 libaray

Section 11) Mappings

Mapping == Map or hashmap of traditional programming languages

Store value in key value pair, store unique value

Note = we can consider it for replacement of array, beacuse it will not checck for uniqueness

Syntax===> mapping(unint => address) private funders


Section 12) Solidity

Withdraw fund -

payable(msg.sender).transfer(amount, account);

For validation - use require(condition, msg); function

Modifiers - we can reuse function or reduce repitations.
modifier function() {}---> modifier is keyword

Owner of contract - 

Note - contract address and contract creation address are diff

address public owner;

constructor() {
    owner = msg.sender;
}


Inheritance in Solidity - 

Create parent contract for resuable code.

then use "is" keyword for extend that into child

Example - 

contract Child is Parent {}

Abstract Contract - 

keyword - abstarct

abstract contract test {
    //verual method
    // can also have method with implementation
}

Interface in Contract -

keyword - interface
syntax - 
interface IFaucet
can not inherit frm other smart contract
they can only inherit from other interafce
they can not declare a constructor
they can not declare state variable
function has to external

Function Accessors -












