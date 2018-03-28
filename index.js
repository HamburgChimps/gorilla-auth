const Server = require('./src/Server')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 9000
const server = new Server(port, dev)
server.start()
