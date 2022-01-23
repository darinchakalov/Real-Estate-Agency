const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const nonExistingController = require("../controllers/nonExistingController.js");
const housingController = require("../controllers/housingController.js");

module.exports = (app) => {
	app.use(homeController);
	app.use(authController);
	app.use(housingController);
	app.use(nonExistingController);
};
