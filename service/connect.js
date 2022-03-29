const { MongoClient} = require('mongodb');

const config = require("config")

const url =  config.get("Database.dbConfig.dbName")


const client = new MongoClient(url);

module.exports = client

