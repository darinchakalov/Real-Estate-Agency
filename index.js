const express = require("express");

const initDB = require("./src/config/db-config.js");

const app = express();

require("./src/config/hbsConfig.js")(app);
require("./src/config/expressConfig.js")(app);

initDB()
	.then(() => {
		app.listen(3000, console.log(`The application is running at http://localhost:3000`));
	})
	.catch((err) => {
		console.log("Application init failed: ", err);
	});
