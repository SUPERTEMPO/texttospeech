const http = require("http");
const app = require('./loader');
const server = http.createServer(app)

module.exports = server