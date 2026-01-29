import { readFile, writeFile } from 'fs/promises';
import path from 'path';

async function test() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'db.json');
        console.log('Testing path:', filePath);
        const content = await readFile(filePath, 'utf8');
        const data = JSON.parse(content);
        console.log('Orders count:', data.orders.length);

        // Try to write (don't change anything, just write back)
        await writeFile(filePath, JSON.stringify(data, null, 2));
        console.log('Write test successful');
    } catch (e) {
        console.error('Test failed:', e);
    }
}

test();
