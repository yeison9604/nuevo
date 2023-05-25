const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const {extname} = require("path");

const app = express();

app.set("port",8080);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", engine({
    defaultLayout : "main",
    layoutsDir : path.join(app.get("views"), "layouts"),
    partialsDir : path.join(app.get("views"), "partials"),
    extname : ".hbs",
}));


app.set("view engine",".hbs");

app.use(morgan("start"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(require("./routes/index"));
app.use(require("./routes/personas"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"));