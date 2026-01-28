import { MongoClient } from 'mongodb';
import fs from 'fs';

// Use the standard connection string to bypass SRV DNS issues
const uri = "mongodb://soniaetchevarne_db_user:NachoF02@ac-9vn2adl-shard-00-00.6tqs4s6.mongodb.net:27017,ac-9vn2adl-shard-00-01.6tqs4s6.mongodb.net:27017,ac-9vn2adl-shard-00-02.6tqs4s6.mongodb.net:27017/?ssl=true&replicaSet=atlas-m66mki-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FRUTOSBRAVOS";
const DB_NAME = 'frutosbravos';

async function migrate() {
    console.log("Starting migration with Standard Connection String...");
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("Connected to MongoDB successfully!");

        // Read local db.json
        const data = JSON.parse(fs.readFileSync('./src/data/db.json', 'utf8'));
        const products = data.products || [];

        if (products.length === 0) {
            console.log("No products found in db.json");
            return;
        }

        console.log(`Found ${products.length} products. Migrating...`);

        const ops = products.map(p => ({
            updateOne: {
                filter: { id: p.id },
                update: { $set: p },
                upsert: true
            }
        }));

        const result = await db.collection('products').bulkWrite(ops);
        console.log(`Migration complete! Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);

    } catch (e) {
        console.error("Migration failed:", e.message);
    } finally {
        await client.close();
    }
}

migrate();
