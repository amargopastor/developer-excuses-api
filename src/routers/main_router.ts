import { FastifyPluginAsync } from 'fastify';

export const main_router: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ hello: 'world' }));
};