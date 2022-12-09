import express from 'express';
const app = express();
import http from 'http';
import { Server } from "socket.io"

const host = "localhost";
const port = 3000;

const server = http.createServer(app);

const __dirname = "/home/barbymak/Node_GB"

app.get('/', (request, respons) => {
	respons.sendFile(__dirname + '/index.html');
});

const io = new Server(server)
let connections = [];

io.sockets.on('connection', (socket) => {
	console.log("Успешное соединение");
	
	connections.push(socket);

	socket.on('disconnect', (data) => {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});

	socket.on('send msg', (data) => {
		io.sockets.emit('add msg', {mess: data.mess, name: data.name, className: data.className});
	});

});

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);