import { FastifyPluginAsync } from 'fastify';
import { Types } from 'mongoose';
import { Excuses } from './Excuses.model';

export const excuses_api: FastifyPluginAsync = async (app) => {
	// C(R)UD: List all excuses
	app.get('/', async () => {
		const excuses_docs = await Excuses.find();

		return excuses_docs;
	});

	// C(R)UD: Get the details of a random excuse
	app.get('/random', async () => {
		const excuses_docs = await Excuses.find();
		const random = Math.floor(Math.random() * excuses_docs.length);

		return excuses_docs[random];
	});

	// C(R)UD: Get the details of a excuse
	app.get<{ Params: { excuses_id: string } }>(
		'/:excuses_id',
		async (req, res) => {
			const { excuses_id } = req.params;

			// Check we have a valid formatted objectid
			if (!Types.ObjectId.isValid(excuses_id)) {
				throw new Error('Please, pass an object id as route param');
			}

			// Find the excuses by id
			const doc = await Excuses.findById(excuses_id);

			// Check if excuses are found
			if (doc) {
				// Return the excuses
				return doc.toObject();
			}
			res.status(404);
			return { status: 'excuses not found' };
		}
	);

	// CRU(D): Delete a excuses
	app.delete<{ Params: { excuses_id: string } }>(
		'/:excuses_id',
		async (req) => {
			const { excuses_id } = req.params;

			// Check we have a valid formatted objectid
			if (!Types.ObjectId.isValid(excuses_id)) {
				throw new Error('Please, pass an object id as route param');
			}

			await Excuses.findByIdAndDelete(excuses_id);
			req.log.info(`Deleted excuses ${excuses_id}`);

			return { staus: 'deleted', excuses_id };
		}
	);
};
