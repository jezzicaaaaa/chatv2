const express = require('express');
const connectdb = require('../dbConnection');
const Rooms = require('../models/roomSchema');
const router = express.Router();
const middleware = require('../middleware');

router.route('/').get((req, res, next) => {
	res.statusCode = 200;

	connectdb.then((db) => {
		Rooms.find({}).then((room) => {
			res.send(room);
		});
	});	
});

// Get Specific Room
router.route('/:id').get(async (req, res) => {
	console.log(req.params);
	
	try {
		const room = await Rooms.findById({_id: req.params.id});
		res.json(room);
		
	} catch (err) {
		res.json({message: err});
	}
});

// Delete Room
router.route('/:id').delete((req, res) => {
	Rooms.findByIdAndRemove({_id: req.params.id}).then((room) => {
		res.send(room);
	});
});

// Update Room
router.route('/:id').patch(async (req, res) => {
	try {
		const updatedRoom = await Rooms.updateOne(
			{ _id: req.params.id },
			{ $set: {roomname: req.body.roomname} }
		);
		res.json(updatedRoom);

	} catch (err) {
		res.json( {message: err});
	}

});

// // Update Room
// router.route('/admin-home/update/:id').put((req, res, next) => {
// 	Rooms.findByIdAndUpdate(req.params.id, {
// 	  $set: req.body
// 	}, (error, data) => {
// 	  if (error) {
// 		return next(error);
// 	  } else {
// 		res.json(data)
// 		console.log('successfully updated!')
// 	  }
// 	})
//   });

module.exports = router;
