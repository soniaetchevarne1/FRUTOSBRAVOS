import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://soniaetchevarne_db_user:NachoF02@frutosbravos.6tqs4s6.mongodb.net/?appName=FRUTOSBRAVOS";
const DB_NAME = 'frutosbravos';

async function checkDb() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const productsCount = await db.collection('products').countDocuments();
        console.log(`Total products in MongoDB: ${productsCount}`);

        if (productsCount > 0) {
            const products = await db.collection('products').find({}).limit(5).toArray();
            console.log('Sample products:', JSON.stringify(products, null, 2));
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkDb();
