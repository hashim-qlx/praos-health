import 'dotenv';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

import express from 'express';
import logger from 'morgan';

import routes from './api/routes/index.js';

const app = express();
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

import { Db } from './database/index.js';
const database = new Db();
app.use('/', routes(express, database));
app.get('*', (req, res) => (res.status(404).send()))
app.use((err, req, res, next) => {
    res.status(err.status || 500).send('Oops! Something went wrong');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => ('running on port ' + PORT));
