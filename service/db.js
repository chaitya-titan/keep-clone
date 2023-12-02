const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

const db = "keepapp";
const database = client.db(db);
const collection = database.collection("users");

exports.collection = collection;

// export.collection = collection;

// async function main() {
//   try {
//     await client.connect();
//     console.log("Connected correctly to server");
//     const database = client.db(db);
//     const collection = database.collection("users");
//     // create a document to be inserted
//     console.log();
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     await client.close();
//   }
// }

// exports.main = main;
