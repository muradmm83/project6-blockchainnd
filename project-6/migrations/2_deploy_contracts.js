// migrating the appropriate contracts
var ManufacturerRole = artifacts.require("ManufacturerRole");
var RetailerRole = artifacts.require("RetailerRole");
var CustomerRole = artifacts.require("CustomerRole");
var SupplyChain = artifacts.require("SupplyChain");

module.exports = function(deployer) {
  deployer.deploy(ManufacturerRole);  
  deployer.deploy(RetailerRole);
  deployer.deploy(CustomerRole);
  deployer.deploy(SupplyChain);
};
