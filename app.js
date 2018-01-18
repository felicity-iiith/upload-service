var Express = require('express');
var multer = require('multer');
var randomstring = require("randomstring");
var basicAuth = require('basic-auth-connect');
var app = Express();
app.use(require('cors')());
var auth = basicAuth('admin', process.env.PASSWORD || 'password')

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./files");
    },
    filename: function(req, file, callback) {
        callback(null, randomstring.generate(7) + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
}).single("file");

app.get("/", auth, function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", auth, function(req, res) {
    upload(req, res, function(err, val) {
        if (err) res.json({ error: 'Error uploading file. ' + err.toString() })
        else res.json({
          filename: process.env.PUBLIC_FRONTEND_URL + '/' + (req.file && req.file.filename)
        })
    });
});

app.listen(8080, function(a) {
    console.log("Listening to port 8080");
});
