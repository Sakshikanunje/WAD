const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect() {

    let result = await client.connect();
    let db = result.db('studinfo');
    return db.collection('data');
}

module.exports = dbConnect;