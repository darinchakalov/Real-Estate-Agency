const handlerbars = require("express-handlebars");
const path = require("path");

const hbsConfig = function (app) {
	app.engine(
		"hbs",
		handlerbars.engine({
			extname: "hbs",
		})
	);
	app.set("views", path.resolve(__dirname, "../views"));
	app.set("view engine", "hbs");
};

module.exports = hbsConfig;
