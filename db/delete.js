#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE messages;
`;

console.log(SQL);
async function main() {
  
  //Will attempt to use a provided connection string from CLI
  let connectionURL = process.argv[2]
  if (!connectionURL) {
    // Provides a connection string if not provided in CLI
    connectionURL = process.env.CONNECTION_STRING
    console.log(`Using connection string: ${connectionURL}`)
  }
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
