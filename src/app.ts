import { FastifyPluginAsync } from 'fastify';
import blipp from 'fastify-blipp';
import fastifyCors from '@fastify/cors';
import { excuses_api } from './developer-excuses/api.developer-excuses';
import { main_router } from './routers/main_router';
import { db_plugin } from './db';

export const main_app: FastifyPluginAsync = async (app) => {
	await app.register(blipp);
	await app.register(fastifyCors);

	app.register(db_plugin);

	await app.register(main_router);
	await app.register(excuses_api, { prefix: '/excuses' });

	app.blipp();
};