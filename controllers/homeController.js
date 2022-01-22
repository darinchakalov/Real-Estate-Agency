const router = require("express").Router();
const housingServices = require("../services/housingServices.js");

const renderHomePage = async (req, res) => {
	try {
		let houses = await housingServices.findLastThree();
		console.log(houses);
		res.render("home", { houses });
	} catch (error) {
		res.local.error = error.message;
		res.render("home");
	}
};

router.get("/", renderHomePage);

module.exports = router;
