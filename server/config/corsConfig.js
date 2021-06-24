module.exports.corsConfig = (req, res, next) => {
    let allowedOrigins = [
        "http://localhost:3000",
        "localhost",
        "127.0.0.1"
    ];
    if(process.env.NODE_ENV === "production"){
        allowedOrigins =  ["supatexttospeech.herokuapp.com","https://texttospeechapp.herokuapp.com"]
    }
    const origin = req.headers.origin;
    const host = req.hostname
    if (allowedOrigins.indexOf(origin) > -1 || allowedOrigins.indexOf(host) > -1) {
          res.setHeader('Access-Control-Allow-Origin', origin ? origin : "*");
          res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,PUT,OPTIONS');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept, Authorization');
          res.header('Cache-Control','no-store')
          res.header('Access-Control-Allow-Credentials', true);
          return next();
    }
    return res.status(403).json({code: 403, error: false,message:"You don't have access to this resource"})
}
