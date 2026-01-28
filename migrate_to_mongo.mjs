import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const uri = "mongodb+srv://soniaetchevarne_db_user:NachoF02@frutosbravos.6tqs4s6.mongodb.net/?appName=FRUTOSBRAVOS";
const DB_NAME = 'frutosbravos';

async function migrate() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(DB_NAME);

        // Read local db.json
        const data = JSON.parse(fs.readFileSync('./src/data/db.json', 'utf8'));
        const products = data.products;

        if (!products || products.length === 0) {
            console.log("No products found in db.json");
            return;
        }

        console.log(`Found ${products.length} products in db.json. Migrating to MongoDB...`);

        // Use bulkWrite to upsert all products
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
        console.error("Error during migration:", e);
    } finally {
        await client.close();
    }
}

migrate();
