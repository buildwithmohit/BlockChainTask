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

// Create blockchain array
const blockchain = [];

// Create Genesis block
const genesisBlock = new Block(0, Date.now(), "Genesis Block", "0");
blockchain.push(genesisBlock);

// Add second block
const block1 = new Block(1, Date.now(), "Second Block Data", blockchain[blockchain.length - 1].hash);
blockchain.push(block1);

// Add third block
const block2 = new Block(2, Date.now(), "Third Block Data", blockchain[blockchain.length - 1].hash);
blockchain.push(block2);

// Display blockchain before change
console.log("=== Blockchain before changing Block 1 data ===");
blockchain.forEach(block => {
  console.log(`Block Index   : ${block.index}`);
  console.log(`Data          : ${block.data}`);
  console.log(`Previous Hash : ${block.previousHash}`);
  console.log(`Hash          : ${block.hash}`);
  console.log('-------------------------------------------');
});

// Challenge Step: Change Block 1 data and recalc hash
console.log("\n*** Changing data of Block 1 ***");
blockchain[1].data = "Tampered Data";
blockchain[1].hash = blockchain[1].calculateHash();

// Display blockchain after change
console.log("\n=== Blockchain after changing Block 1 data (without fixing next blocks) ===");
blockchain.forEach(block => {
  console.log(`Block Index   : ${block.index}`);
  console.log(`Data          : ${block.data}`);
  console.log(`Previous Hash : ${block.previousHash}`);
  console.log(`Hash          : ${block.hash}`);

  // Check if previousHash matches the hash of the previous block (except genesis)
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

