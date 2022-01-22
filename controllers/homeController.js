const router = require("express").Router();
const housingServices = require("../services/housingServices.js");

const renderHomePage = (req, res) => {
	try {
		let houses = housingServices.findLastThreeHouses();
		res.render("home", houses);
	} catch (error) {
		res.local.error = error.message;
		res.render("home");
	}
};

router.get("/", renderHomePage);

module.exports = router;
