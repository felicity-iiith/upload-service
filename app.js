var Express = require('express');
var multer = require('multer');
var app = Express();
app.use(require('./auth'))

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./files");
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
}).single("file");

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    upload(req, res, function(err, val) {
        var toret = {
          status: !err,
          path: req.file && req.file.filename
        }
        res.json(toret)
    });
});

app.listen(8080, function(a) {
    console.log("Listening to port 8080");
});
