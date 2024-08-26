#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
SELECT * FROM messages;
`;

console.log(SQL);
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  const res = await client.query(SQL);
  console.log(res)
  await client.end();
  console.log("done");
}

main();
