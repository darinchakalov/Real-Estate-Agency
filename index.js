const express = require("express");
const initDB = require("./src/config/db-config.js");
const { PORT } = require("./src/config/constants.js");

const app = express();

require("./src/config/hbsConfig.js")(app);
require("./src/config/expressConfig.js")(app);

initDB()
	.then(() => {
		app.listen(PORT, console.log(`The application is running at http://localhost:${PORT}`));
	})
	.catch((err) => {
		console.log("Application init failed: ", err);
	});
