const express = require('express');
const connectdb = require('../dbConnection');
const Rooms = require('../models/roomSchema');
const router = express.Router();
const middleware = require('../middleware');

router.route('/').get((req, res, next) => {
	res.statusCode = 200;

	connectdb.then((db) => {
		Rooms.find({}).then((room) => {
			res.send(chat);
		});
	});
});

module.exports = router;
