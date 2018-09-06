import bluebird from 'bluebird';
import { config } from 'dotenv';
import mongoose from 'mongoose';

/** Load environment variables */
config();

/** Setup promises to mongoose */
mongoose.Promise = bluebird;

/**
 * Connect to mongoose.
 * @returns Promise<void>
 */
export async function connect2Mongoose() {
	const mongoURI = process.env.MONGODB_URI;
	return new Promise((resolve, reject) => mongoose.connect(mongoURI, { useNewUrlParser: true }, err => {
		if (err) reject(err);
		else resolve();
	}));
}

/**
 * Disconnect to mongoose.
 * @returns Promise<void>
 */
export async function disconnect2Mongoose() {
	return new Promise((resolve, reject) => mongoose.disconnect(err => {
		if (err) reject(err);
		else resolve();
	}));
}