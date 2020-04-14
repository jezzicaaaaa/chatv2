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

router.route('/:id').get((req, res, next) => {
	res.statusCode = 200;
	connectdb.then((db) => {
		Rooms.find({}).then((room) => {
			res.send(room);
		});
	});	
});

  // Delete Room
  router.route('/rooms/:id').delete((req, res, next) => {
	  res.statusCode = 200;
	  connectdb.then((db) => {
		Rooms.findByIdAndRemove({_id: req.params.id}).then((room) => {
			res.send(room);
		});
	  });
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
