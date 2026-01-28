import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Using the direct URI to a single node to avoid SRV/ReplicaSet discovery issues
const uri = "mongodb://soniaetchevarne_db_user:NachoF02@ac-9vn2adl-shard-00-00.6tqs4s6.mongodb.net:27017/frutosbravos?ssl=true&authSource=admin";

async function run() {
    console.log("🚀 Iniciando migración forzada desde terminal...");
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

    try {
        await client.connect();
        console.log("✅ Conectado a MongoDB Atlas!");

        const db = client.db('frutosbravos');
        const filePath = path.join(process.cwd(), 'src', 'data', 'db.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const products = data.products || [];

        console.log(`📦 Encontrados ${products.length} productos en db.json. Subiendo...`);

        for (const product of products) {
            await db.collection('products').updateOne(
                { id: product.id },
                { $set: product },
                { upsert: true }
            );
        }

        console.log("✨ ¡Migración terminada con éxito!");
    } catch (e) {
        console.error("❌ Error durante la migración:", e.message);
    } finally {
        await client.close();
    }
}

run();
