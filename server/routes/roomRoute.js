const express = require('express');
const connectdb = require('../dbConnection');
const Chats = require('../models/chatSchema');
const router = express.Router();

router.get('/roomname=:room', function(req, res) {
	if (!req.params.room) {
		return res.status(400).send({
			success: 'false',
			message: 'roomname query parameter is required'
		});
	} else {
		res.statusCode = 200;
		connectdb.then((db) => {
			Chats.find({ roomname: req.params.room }).then((chat) => {
				res.send(chat);
			});
		});
	}
});

module.exports = router;
