require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db('test');
    const collection = db.collection('persons');

    // Данные для вставки
    const data = {
      name: 'John Doe',
      age: 30,
      email: 'johndoe@example.com',
    };

    // Вставка данных
    const insertResult = await collection.insertOne(data);
    console.log('Данные успешно вставлены:', insertResult.insertedId);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
