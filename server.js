var express = require("express");
var app = express();
const path = require("path");

app.set('port', process.env.PORT || 4040);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use((req, res) => {
    res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(app.get('port'), () => {
    console.log("Server started");
});