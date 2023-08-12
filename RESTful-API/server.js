const http = require('http')
const app=require('./app')

const port=process.env.PORT || 3000     //to retrieve the value of the PORT environment variable else 3000 PORT

const server=http.createServer(app);

server.listen(port)
