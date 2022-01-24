const router = require("express").Router();
const housingServices = require("../services/housingServices.js");

const renderSearchPage = (req, res) => {
	res.render("search");
};

const searchHousings = async (req, res) => {};

router.get("/search", renderSearchPage);

module.exports = router;
