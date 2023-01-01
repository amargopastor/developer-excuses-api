import { FastifyPluginAsync } from 'fastify';
import mongoose from 'mongoose';
import { DB_URL } from './config';

export const prepare_db = async () => {
	await mongoose.connect(DB_URL);
	const close_connection = () => mongoose.disconnect();
	return { close_connection };
};

export const db_plugin: FastifyPluginAsync = async (app) => {
	await prepare_db();
	app.log.info(`Database ready ${DB_URL}`);
};