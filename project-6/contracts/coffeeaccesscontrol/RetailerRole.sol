pragma solidity ^0.4.24;

import './Roles.sol';

contract RetailerRole {
    
    using Roles for Roles.Role;
    
    Roles.Role private retailers;
    
    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);
    
    modifier onlyRetailer() {
        require(isRetailer(msg.sender), "Account is not Retailer");
        _;
    }
    
    constructor() public {
        _addRetailer(msg.sender);
    }
    
    function isRetailer(address account) public view returns(bool){
        return retailers.has(account);
    }
    
    function _addRetailer(address account) internal {
        retailers.add(account);
        emit RetailerAdded(account);
    }
    
    function _removeRetailer(address account) internal {
        retailers.remove(account);
    }
    
    function addRetailer(address account) public onlyRetailer {
        _addRetailer(account);
        emit RetailerAdded(account);
    }
    
    function renounceRetailer() public {
        _removeRetailer(msg.sender);
    }
    
}