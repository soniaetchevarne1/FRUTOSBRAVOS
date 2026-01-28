import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const hosts = [
    "ac-9vn2adl-shard-00-00.6tqs4s6.mongodb.net:27017",
    "ac-9vn2adl-shard-00-01.6tqs4s6.mongodb.net:27017",
    "ac-9vn2adl-shard-00-02.6tqs4s6.mongodb.net:27017"
];

async function run() {
    console.log("🚀 Buscando el Nodo Primario para subir los productos...");

    for (const host of hosts) {
        const uri = `mongodb://soniaetchevarne_db_user:NachoF02%2F@${host}/frutosbravos?ssl=true&authSource=admin&directConnection=true`;
        const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

        try {
            await client.connect();
            const db = client.db('frutosbravos');
            const isMaster = await db.command({ isMaster: 1 });

            if (isMaster.ismaster) {
                console.log(`✅ ¡Encontrado Primario en ${host}! Iniciando subida...`);

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

                console.log("✨ ¡TODO LISTO! Tus productos ya están en la nube.");
                await client.close();
                return;
            } else {
                console.log(`ℹ️ ${host} es secundario, saltando...`);
            }
            await client.close();
        } catch (e) {
            console.log(`⚠️ No se pudo conectar a ${host}: ${e.message}`);
        }
    }
    console.error("❌ No se encontró ningún nodo primario accesible.");
}

run();
