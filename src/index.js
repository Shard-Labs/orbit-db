const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");
const fs = require('fs');

function loadFile( path ){
  return fs.readFileSync(path, 'utf8');
}

(async (IPFS, OrbitDB) => {
  const ipfs = await IPFS.create({});
  const orbitdb = await OrbitDB.createInstance(ipfs);

  const db = await orbitdb.keyvalue("test-goerli");

  let dict = {};
  const textFileLines = loadFile('./public/code.txt').split('\n').forEach(element => {
    dict[element.split(' ')[0]] = element.split(' ')[1];
  });

  console.log(db.address);

  console.log(dict);
  let promises = [];
  for (let [key, value] of Object.entries(dict)) {
      promises.push(db.put(key, {creationBytecode: value}))
  }

  Promise.all(promises).then((result) => {
      console.log(result);
      for (let [key, value] of Object.entries(dict)) {
          //TODO:
          console.log(db.get(key))
      }
  });

})(IPFS, OrbitDB);
