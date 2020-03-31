const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");



(async (IPFS, OrbitDB) => {
  const ipfs = await IPFS.create({});
  const orbitdb = await OrbitDB.createInstance(ipfs);

  const db = await orbitdb.keyvalue("test-goerli");
  await db.put("hello", { name: "World" });
  const value = db.get("hello");

  console.log(value);
  console.log(db.address);
})(IPFS, OrbitDB);
