import bluebird from 'bluebird';
import mongoose from 'mongoose';

/** Setup promises to mongoose */
mongoose.Promise = bluebird;
/** Connect to database */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, err => {
	if (!err) return console.info('Connection to database successfully.');
	console.error('[ERROR] Cannot connect to database:', err);
	process.exit();
});