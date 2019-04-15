const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	socket.on('connectRoom', box => {
		socket.join(box);
	})
	console.log("ok");
})

mongoose.connect('mongodb://pantoja:123qwe@ds159747.mlab.com:59747/homebox', {
	useNewUrlParser: true
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((req, res, next) => {
	req.io = io;
	return next();
})

server.listen(process.env.PORT || 3333);