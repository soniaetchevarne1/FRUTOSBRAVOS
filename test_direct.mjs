import { MongoClient } from 'mongodb';

// Try direct connection to one node to verify credentials
const uri = "mongodb://soniaetchevarne_db_user:NachoF02@ac-9vn2adl-shard-00-00.6tqs4s6.mongodb.net:27017/?ssl=true&authSource=admin&directConnection=true";

async function test() {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    try {
        console.log("Testing direct connection...");
        await client.connect();
        console.log("SUCCESS!");
    } catch (e) {
        console.error("FAILED:", e.message);
    } finally {
        await client.close();
    }
}

test();
