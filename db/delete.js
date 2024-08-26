#! /usr/bin/env node
const { argv } = require('node:process');
const { Client } = require("pg");

const SQL = `
DROP TABLE messages;
`;

console.log(SQL);
async function main() {
  
  const connectionURL = process.argv[2]
  console.log({connectionURL})
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionURL,
  });
  await client.connect();
  const res = await client.query(SQL);
  console.log(res)
  await client.end();
  console.log("done");
}

main();
