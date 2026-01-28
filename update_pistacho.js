const { MongoClient } = require('mongodb');
const uri = "mongodb://soniaetchevarne_db_user:NachoF02@ac-9vn2adl-shard-00-00.6tqs4s6.mongodb.net:27017,ac-9vn2adl-shard-00-01.6tqs4s6.mongodb.net:27017,ac-9vn2adl-shard-00-02.6tqs4s6.mongodb.net:27017/?ssl=true&replicaSet=atlas-m66mki-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FRUTOSBRAVOS";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('frutosbravos');
        const result = await db.collection('products').updateMany(
            { name: { $regex: /pistacho/i } },
            { $set: { image: '/uploads/pistachos_vibrantes.png' } }
        );
        console.log(`Successfully updated ${result.modifiedCount} products.`);
    } catch (e) {
        console.error('Error updating MongoDB:', e);
    } finally {
        await client.close();
    }
}

run();
