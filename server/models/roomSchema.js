const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
	{
		roomname: { type: String },
		created: Date,
		edited: Date,
		status: String
	},
	{
		collection: 'rooms'
	}
);

let Room = mongoose.model('Room', chatSchema);

module.exports = Room;
