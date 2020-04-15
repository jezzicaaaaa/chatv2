const express = require('express');
const app = express();

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

var server = app.listen(8080);
var io = require('socket.io').listen(server);

const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const data = require('./data');
const middleware = require('./middleware');

const connect = require('./dbConnection');
const Chat = require('./models/chatSchema');
const chatRouter = require('./routes/chatRoute');
const Sockets = require('./models/socketSchema');
const socketRouter = require('./routes/socketRoute');
const Rooms = require('./models/roomSchema');
const roomRouter = require('./routes/roomRoute');
const index = require('./routes/index');

let port = process.env.PORT || 3100;
app.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
app.options('*', cors());

app.get('/api/tips/regular', (req, res) => {
	res.json(data.regular);
});

app.get('/api/tips/special', middleware, (req, res) => {
	res.json(data.special);
});

//routes
// Use Api routes in the App
app.use('/', index);
app.use('/chat', chatRouter);
app.use('/events', socketRouter);
app.use('/rooms', roomRouter);
// app.use('/rooms/:id', roomRouter);
// app.delete('/rooms/:id', roomRouter);
// app.patch('/rooms/:id', roomRouter);

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
		return res.status('409').json('Authentication failed. Admin not found.');
	}
});

console.log('api running on port ' + port + ': ');

//SOCKETS
const users = [];
const rooms = [];

const getRooms = () => {
	return rooms;
};

const getUsers = () => {
	return users;
};
const emitRooms = () => {
	io.emit('rooms', getRooms());
};
const emitUsers = () => {
	io.emit('users', getUsers());
};
const returnUsername = () => {
	io.emit('username', socket.username);
};
const userjoined = (data, roomname) => {
	io.to(roomname).emit('broadcast', data);
};
const sendMsg = (roomname, data) => {
	io.to(roomname).emit('received', data);
};

io.on('connection', (socket) => {
	console.log('User connected', socket.id);
	console.log(' %s sockets connected', io.engine.clientsCount);

	io.emit('rooms', getRooms());

	socket.on('create_room', (roomname, username, status) => {
		rooms.push(roomname);
		socket.join(roomname);
		socket.username = username;
		console.log(socket.username, 'has created the room:', roomname);
		users.push({ id: socket.id, username: username });
		emitRooms();
		emitUsers();

		connect.then((db) => {
			let event = new Sockets({
				event: 'create_room',
				socketid: socket.id,
				username: socket.username,
				roomname: roomname
			});

			let room = new Rooms({
				roomname: roomname,
				created: Date.now(),
				edited: Date.now(),
				status: status
			});
			event.save();
			room.save();
		});
	});

	socket.on('sendMessage', (msgObj) => {
		let obj = { sender: msgObj.sender, msg: msgObj.message };
		sendMsg(msgObj.room, obj);

		connect.then((db) => {
			let chatMessage = new Chat({ message: msgObj.message, sender: msgObj.sender, roomname: msgObj.room });
			chatMessage.save();
			let event = new Sockets({
				event: 'sendMessage',
				socketid: socket.id,
				username: socket.username,
				roomname: msgObj.room
			});
			event.save();
		});
	});

	socket.on('typing', (obj) => {
		socket.to(obj.room).emit('type', socket.username);
	});

	socket.on('stopped_typing', (roomname) => {
		console.log(socket.username, 'has stopped typing', roomname);
		socket.to(roomname).emit('stop_typing', socket.username);
	});

	socket.on('username', (username) => {
		socket.username = username;
	});

	socket.on('join', (roomname) => {
		socket.join(roomname);
		let data = { user: socket.username, id: socket.id };
		userjoined(data, roomname);
		let event = new Sockets({ event: 'join', socketid: socket.id, username: socket.username, roomname: roomname });
		event.save();
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
