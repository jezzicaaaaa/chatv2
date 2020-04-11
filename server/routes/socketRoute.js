const express = require('express');
const connectdb = require('../dbConnection');
const Socket = require('../models/socketSchema');
const router = express.Router();

router.route('/').get((req, res, next) => {
	res.statusCode = 200;

	connectdb.then((db) => {
		Socket.find({}).then((socket) => {
			res.send(socket);
		});
	});
});

module.exports = router;
