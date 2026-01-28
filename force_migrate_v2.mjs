import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// URL encoding the slash in the password 'NachoF02/' -> 'NachoF02%2F'
const uri = "mongodb://soniaetchevarne_db_user:NachoF02%2F@ac-9vn2adl-shard-00-00.6tqs4s6.mongodb.net:27017,ac-9vn2adl-shard-00-01.6tqs4s6.mongodb.net:27017,ac-9vn2adl-shard-00-02.6tqs4s6.mongodb.net:27017/?ssl=true&replicaSet=atlas-m66mki-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FRUTOSBRAVOS";

async function run() {
    console.log("🚀 Iniciando migración con contraseña corregida...");
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

    try {
        await client.connect();
        console.log("✅ ¡CONECTADO CON ÉXITO!");

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

        console.log("✨ ¡TODO LISTO! Los productos ya están en la nube.");
    } catch (e) {
        console.error("❌ Falló la migración:", e.message);
    } finally {
        await client.close();
    }
}

run();
