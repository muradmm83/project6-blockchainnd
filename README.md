This repository is based on the starter code provided by Udacity. You can find it [here](https://github.com/udacity/nd1309/tree/master/course-5/project-6).


## UMLs

The following are the UMLs for Watches supply chain:

### Activity Diagram

![Activity Diagram](UML/Watches\%20Activity\%20Diagram.png)

### Sequence Diagram
![Sequence Diagram](UML/Watches\%20Sequence\%20Diagram.png)

### State Diagram
![Sequence Diagram](UML/Watches\%20State\%20Diagram.png)

### Data Model Diagram
![Sequence Diagram](UML/Watches\%20Data\%20Model\%20Diagram.png)


## Installing

Clone this repository:

```
git clone https://github.com/muradmm83/project6-blockchainnd
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```


In a separate terminal window, Compile smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Test smart contracts:

```
truffle test
```

In a separate terminal window, launch the DApp:

```
npm run dev
```