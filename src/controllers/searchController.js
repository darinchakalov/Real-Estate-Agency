const router = require("express").Router();
const housingServices = require("../services/housingServices.js");

const renderSearchPage = (req, res) => {
	res.render("search");
};

const searchHousings = async (req, res) => {
	try {
		let results = await housingServices.search(req.body.search);
		console.log(results);
		res.render("search", { results });
	} catch (error) {
		res.locals.error = error;
		res.render("search");
	}
};

router.get("/search", renderSearchPage);
router.post("/search", searchHousings);

module.exports = router;
