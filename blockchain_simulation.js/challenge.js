const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const blockString = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
    return crypto.createHash('sha256').update(blockString).digest('hex');
  }
}


const blockchain = [];


const genesisBlock = new Block(0, Date.now(), "Genesis Block", "0");
blockchain.push(genesisBlock);


const block1 = new Block(1, Date.now(), "Second Block Data", blockchain[blockchain.length - 1].hash);
blockchain.push(block1);


const block2 = new Block(2, Date.now(), "Third Block Data", blockchain[blockchain.length - 1].hash);
blockchain.push(block2);


console.log("=== Blockchain before changing Block 1 data ===");
blockchain.forEach(block => {
  console.log(`Block Index   : ${block.index}`);
  console.log(`Data          : ${block.data}`);
  console.log(`Previous Hash : ${block.previousHash}`);
  console.log(`Hash          : ${block.hash}`);
  console.log('-------------------------------------------');
});


console.log("\n*** Changing data of Block 1 ***");
blockchain[1].data = "Tampered Data";
blockchain[1].hash = blockchain[1].calculateHash();


console.log("\n=== Blockchain after changing Block 1 data (without fixing next blocks) ===");
blockchain.forEach(block => {
  console.log(`Block Index   : ${block.index}`);
  console.log(`Data          : ${block.data}`);
  console.log(`Previous Hash : ${block.previousHash}`);
  console.log(`Hash          : ${block.hash}`);

  
  if (block.index > 0) {
    const prevBlock = blockchain[block.index - 1];
    if (block.previousHash !== prevBlock.hash) {
      console.log(">> Invalid Block! Previous hash does not match.");
    } else {
      console.log(">> Valid Block");
    }
  }
  console.log('-------------------------------------------');
});

