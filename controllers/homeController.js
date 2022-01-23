const router = require("express").Router();
const housingServices = require("../services/housingServices.js");

const renderHomePage = async (req, res) => {
	try {
		let houses = await housingServices.findLastThree();
		res.render("home", { houses });
	} catch (error) {
		res.local.error = error.message;
		res.render("home");
	}
};

const renderSearchPage = (req, res) => {
	res.render("search");
};

router.get("/", renderHomePage);
router.get("/search", renderSearchPage);

module.exports = router;
