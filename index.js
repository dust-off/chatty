const app = require('express')()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on("connection", (socket) => {
    console.log('user connected')
    // socket.emit('message',  'user connected')

    socket.on("message", (data) => {
        console.log('message recieved', data)
        socket.emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        io.emit('message', 'user disconnected')
    })
})
