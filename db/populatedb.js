#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR (255),
  username VARCHAR (25),
  added DATE
);

INSERT INTO messages (text, username, added)
VALUES
  ('Hi there!', 'Amanda', '2024-03-15'),
  ('Hey, did you get that super secret message I sent you?', 'Charles', '2024-04-22'),
  ('Howdy friends!', 'Bubba', '2024-05-30');
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
  console.log("seeding...");
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
