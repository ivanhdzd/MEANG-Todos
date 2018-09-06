import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

/** Todo mongoose schema. */
const TodoSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: [true, 'Todo title can\'t be blank']
	},
	status: {
		type: String,
		required: [true, 'Todo status can\'t be blank'],
		enum: ['WAITING', 'DOING', 'DONE'],
		default: 'WAITING'
	},
	description: {
		type: String,
		required: [true, 'Todo description can\'t be blank']
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true
	}
},
{
	collection: 'Todos',
	timestamps: true
});

/** Add unique validator plugin to Todo schema. */
TodoSchema.plugin(uniqueValidator, { message: 'is already taken' });

/** Set Todo schema to a model called Todo */
export default mongoose.model('Todo', TodoSchema);