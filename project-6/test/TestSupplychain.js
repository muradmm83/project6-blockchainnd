// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function (accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originManufacturerID = accounts[1]
    const originManufacturerName = "Tick Tock"
    const originManufacturerInformation = "The Watch Maker"
    const originManufacturerLatitude = "-38.239770"
    const originManufacturerLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "A watch that can stop time :)"
    const productPrice = web3.toWei(1, "ether")
    var itemState = 0
    const retailerID = accounts[2]
    const customerID = accounts[3]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", ownerID)
    console.log("Manufacturer: accounts[1] ", originManufacturerID)
    console.log("Retailer: accounts[3] ", retailerID)
    console.log("Customer: accounts[4] ", customerID)

    // 1st Test
    it("Testing smart contract function manufactureItem() that allows a manufacturer to manufacture watch", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        var eventEmitted = false

        // Watch the emitted event Manufactured()
        var event = supplyChain.Manufactured()
        await event.watch((err, res) => {
            eventEmitted = true
        })

        // Mark an item as Manufactured by calling function manufacturedItem()
        await supplyChain.manufactureItem(upc, originManufacturerID, originManufacturerName, originManufacturerInformation, originManufacturerLatitude, originManufacturerLongitude, productNotes)

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 2nd Test
    it("Testing smart contract function assembleItem() that allows a manufacturer to assemble watch", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Assembled()
        var event = supplyChain.Assembled()
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Assembled by calling function assembleItem()
        await supplyChain.assembleItem(upc);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    })

    // 3rd Test
    it("Testing smart contract function packItem() that allows a manufacturer to pack watch", async () => {
        const supplyChain = await SupplyChain.deployed();

        await supplyChain.RetailerAdded().watch((err, res) => {
            console.log('Retailer Added', res);
        })

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Packed()
        var event = supplyChain.Packed()
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(upc);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 4th Test
    it("Testing smart contract function sellItem() that allows a manufacturer to sell watch", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event ForSale()
        var event = supplyChain.ForSale()
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as ForSale by calling function sellItem()
        await supplyChain.sellItem(upc, productPrice);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);


        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    })

    // 5th Test
    it("Testing smart contract function buyItem() that allows a retailer to buy watch", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Sold()
        var event = supplyChain.Sold();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.buyItem(upc, {
            value: productPrice
        });

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);


        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 4, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a manufacturer to ship watch", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Shipped()
        var event = supplyChain.Shipped();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Sold by calling function shipItem()
        await supplyChain.shipItem(upc);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);


        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 5, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    })

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark watch received", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Received()
        var event = supplyChain.Received();
        await event.watch((err, res) => {
            eventEmitted = true
        });

        // Mark an item as Sold by calling function receiveItem()
        await supplyChain.receiveItem(upc);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 6, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a customer to purchase watch", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Purchased()
        var event = supplyChain.Purchased();
        await event.watch((err, res) => {
            eventEmitted = true;
        });

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.purchaseItem(upc);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);


        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originManufacturerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originManufacturerName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originManufacturerInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originManufacturerLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originManufacturerLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    })

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const item = await supplyChain.fetchItemBufferOne.call(upc);

        // Verify the result set:
        assert.equal(item[0], sku, 'Error: Invalid SKU');
        assert.equal(item[1], upc, 'Error: Invalid UPC');
        assert.equal(item[2], ownerID, 'Error: Invalid or missing ownerID');
        assert.equal(item[3], originManufacturerID, 'Error: Invalid or missing originManufacturerID');
        assert.equal(item[4], originManufacturerName, 'Error: Invalid or missing originManufacturerName');
        assert.equal(item[5], originManufacturerInformation, 'Error: Invalid or missing originManufacturerInformation');
        assert.equal(item[6], originManufacturerLatitude, 'Error: Invalid or missing originManufacturerLatitude');
        assert.equal(item[7], originManufacturerLongitude, 'Error: Invalid or missing originManufacturerLongitude');

    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const item = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set:
        assert.equal(item[0], sku, 'Error: Invalid SKU');
        assert.equal(item[1], upc, 'Error: Invalid UPC');
        assert.equal(item[2], productID, 'Error: Invalid or missing productID');
        assert.equal(item[3], productNotes, 'Error: Invalid or missing productNotes');
        assert.equal(item[4], productPrice, 'Error: Invalid or missing productPrice');
        assert.equal(item[5], 7, 'Error: Invalid item status');

        /*
            I was unable to assert the following values. I'm unaware of a way to chage owner address for the contract. Please
            point me on the right direction as to how to go over this.
        */
        // assert.equal(item[6], retailerID, 'Error: Invalid or missing retailerID');
        // assert.equal(item[7], customerID, 'Error: Invalid or missing customerID');
    })

});