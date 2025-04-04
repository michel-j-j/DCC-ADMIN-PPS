import express from 'express';
import payload from 'payload';
import path from 'path';

require('dotenv').config();
const app = express();

app.use('/assets', express.static(path.resolve(__dirname, './assets')));
// Redirect root to Admin panel
app.get('/', (_, res) => {
    res.redirect('/admin');
});

const start = async () => {
    // Initialize Payload
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        mongoURL: process.env.MONGODB_URI,
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    // Add your own express routes here

    app.listen(3000);
};

start();
