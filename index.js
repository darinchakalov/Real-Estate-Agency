const express = require("express");
const handlerbars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const initDB = require("./config/db-config.js");
const router = require("./config/routes.js");
const { auth } = require("./middlewares/authMiddleware.js");

const app = express();

app.engine(
	"hbs",
	handlerbars.engine({
		extname: "hbs",
	})
);

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("static"));

app.use(cookieParser());

app.use(auth);

router(app);

initDB()
	.then(() => {
		app.listen(3000, console.log(`The application is running at http://localhost:3000`));
	})
	.catch((err) => {
		console.log("Application init failed: ", err);
	});
