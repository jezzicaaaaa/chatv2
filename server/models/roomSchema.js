const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
	{
		roomname: { type: String },
		created: { type: Date },
		edited: { type: Date },
		status: { type: String }
	},
	{
		collection: 'rooms'
	}
);

let Room = mongoose.model('Room', roomSchema);

module.exports = Room;
