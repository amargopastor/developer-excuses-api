import dotenv from 'dotenv';

dotenv.config();

const checkEnv = (envVar: string) => {
	if (!process.env[envVar]) {
		throw new Error(`Please define the Enviroment variable ${envVar}`);
	} else {
		return process.env[envVar] as string;
	}
};

export const PORT: number = parseInt(checkEnv('PORT'), 10);
export const DB_URL: string = checkEnv('DB_URL');