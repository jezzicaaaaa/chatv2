'use strict';
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');

const connect = require('./dbConnection');
const Chat = require('./models/chatSchema');
const chatRouter = require('./routes/chatRoute');
const Socket = require('./models/socketSchema');
const socketRouter = require('./routes/socketRoute');
const roomRouter = require('./routes/roomRoute');
const index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/tips/regular', (req, res) => {
	res.json(data.regular);
});

app.get('/api/tips/special', middleware, (req, res) => {
	res.json(data.special);
});

//routes
// Use Api routes in the App
app.use('/api', index);
app.use('/chat', chatRouter);
app.use('/events', socketRouter);
app.use('/room', roomRouter);

app.post('/api/auth', (req, res) => {
	let user = data.users.filter((user) => {
		return user.username == req.body.username && user.password == req.body.password;
	});
	if (user.length) {
		let token_payload = {
			username: user[0].username,
			password: user[0].password
		};
		// create a token using user name and password vaild for 2 hours
		let token = jwt.sign(token_payload, 'jwt_secret_password', { expiresIn: '2h' });
		let response = {
			message: 'Token Created, Authentication Successful!',
			token: token
		};
		// return the information including token as JSON
		return res.status(200).json(response);
	} else {
		return res.status('409').json('Authentication failed. admin not found.');
	}
});
let port = 3100;
app.listen(port);
console.log('api runnging on port ' + port + ': ');
