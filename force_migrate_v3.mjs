import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Testing ONE SINGLE NODE with encoded password
const uri = "mongodb://soniaetchevarne_db_user:NachoF02%2F@ac-9vn2adl-shard-00-00.6tqs4s6.mongodb.net:27017/frutosbravos?ssl=true&authSource=admin&directConnection=true";

async function run() {
    console.log("🚀 Probando conexión directa a UN NODO (con / en pass)...");
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 20000 });

    try {
        await client.connect();
        console.log("✅ ¡CONECTADO AL NODO 0!");

        const db = client.db('frutosbravos');
        const filePath = path.join(process.cwd(), 'src', 'data', 'db.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const products = data.products || [];

        console.log(`📦 Subiendo ${products.length} productos...`);

        for (const product of products) {
            await db.collection('products').updateOne(
                { id: product.id },
                { $set: product },
                { upsert: true }
            );
        }

        console.log("✨ ¡TODO LISTO!");
    } catch (e) {
        console.error("❌ Falló:", e.message);
    } finally {
        await client.close();
    }
}

run();
