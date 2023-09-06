import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from './models/user.model.js';
dotenv.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/mongoose-watch';
mongoose.connect(mongoUri).then(() => console.log('Connected to database'));
async function createUser(payload) {
    return User.create(payload);
}
User.watch().on('change', (data) => {
    if (data.operationType === 'insert') {
        console.log('User inserted: ', data.fullDocument);
    }
    if (data.operationType === 'replace') {
        console.log('User updated: ', data.fullDocument);
    }
    if (data.operationType === 'delete') {
        console.log('User deleted: ', data._id);
    }
});
async function run() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    await createUser({
        email: faker.internet.email({ firstName, lastName }),
        firstName,
        lastName,
    });
}
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function start() {
    for (let i = 0; i < 5; i++) {
        await delay(5000); // Асинхронная задержка на 5 секунд
        run();
    }
}
start();
