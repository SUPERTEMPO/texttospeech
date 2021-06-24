let express =  require("express")
const { corsConfig } = require("../config/corsConfig");
const path = require("path");
const textSpeechRoute = require("../routes/textSpeechRoute");

const app = express()
app.use(corsConfig)
app.use(express.json({limit: '50000kb'}))
app.use(express.urlencoded({extended: false,limit: '50000kb',parameterLimit:50000}))
app.use('/public',express.static(path.join(__dirname,'../public')))
// configuring all the routes
app.use(textSpeechRoute)

module.exports = app
