require('dotenv').config();
const appConfig = require('./config/appConfig');
const server = require('./loaders/server')
const PORT = appConfig.port || 5000
server.listen(PORT,() =>{
    console.log(process.env.NODE_ENV)
    console.log(`server listening on port ${PORT}`)
})



