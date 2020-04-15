const express = require('express');
const connectdb = require('../dbConnection');
const Rooms = require('../models/roomSchema');
const router = express.Router();
const middleware = require('../middleware');

// Get Rooms
router.route('/').get(async (req, res) => {
	try {
		const room = await Rooms.find({});
		res.json(room);
	} catch (err) {
		res.json({ message: err });
	}
});

// Get Specific Room
router.route('/:id').get(async (req, res) => {
	try {
		const room = await Rooms.findById({ _id: req.params.id });
		res.json(room);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete Room
router.route('/:id').delete(async (req, res) => {
	try {
		const removeRoom = await Rooms.findByIdAndRemove({ _id: req.params.id });
		res.json(removeRoom);
	} catch (err) {
		res.json({ message: err });
	}
});

// Update Room
router.route('/:id').patch(async (req, res) => {
	try {
		const updatedRoom = await Rooms.updateOne(
			{ _id: req.params.id },
			{ $set: { roomname: req.body.roomname, status: req.body.status, edited: Date.now() } }
		);
		res.json(updatedRoom);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
