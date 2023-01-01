import fastify from 'fastify';
import { main_app } from './app';
import { PORT } from './config';

const server = fastify({
	logger: true,
	disableRequestLogging: true,
});

server.register(main_app);

server.listen(PORT, '0.0.0.0');