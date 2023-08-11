require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db('test');
    const collection = db.collection('persons');

    // Начинаем отслеживание изменений в коллекции
    const changeStream = collection.watch();

    // Обработчик изменений
    changeStream.on('change', (change) => {
      console.log('Изменение:', change);

      // Здесь вы можете добавить код для реакции на изменения в данных
    });

    console.log('Начало отслеживания изменений...');

    // Поддерживаем соединение активным
    await new Promise((resolve) => setTimeout(resolve, 60000)); // Ожидание 1 минута

    // Остановка отслеживания при необходимости
    changeStream.close();
    console.log('Отслеживание изменений завершено.');
  } finally {
    await client.close();
  }
}

main().catch(console.error);
