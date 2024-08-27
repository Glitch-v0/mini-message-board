const { Client } = require("pg");
require("dotenv").config();

const SQL = `
SELECT * FROM messages;
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
  const client = new Client({
    connectionString: connectionURL,
  });
  console.log("seeding...");
  await client.connect();
  const res = await client.query(SQL);
  await client.end();
  console.log(res)
  console.log("done");
}

main();
