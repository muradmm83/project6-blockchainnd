pragma solidity ^0.4.24;

import './Roles.sol';

contract CustomerRole {
    
    using Roles for Roles.Role;
    
    Roles.Role private customers;
    
    event CustomerAdded(address indexed account);
    event CustomerRemoved(address indexed account);
    
    modifier onlyCustomer() {
        require(isCustomer(msg.sender), "Account is not Customer");
        _;
    }
    
    constructor() public {
        _addCustomer(msg.sender);
    }
    
    function isCustomer(address account) public view returns(bool){
        return customers.has(account);
    }
    
    function _addCustomer(address account) internal {
        customers.add(account);
        emit CustomerAdded(account);
    }
    
    function _removeCustomer(address account) internal {
        customers.remove(account);
        emit CustomerRemoved(account);
    }
    
    function addCustomer(address account) public onlyCustomer {
        _addCustomer(account);
    }
    
    function renounceCustomer() public {
        _removeCustomer(msg.sender);
    }
}