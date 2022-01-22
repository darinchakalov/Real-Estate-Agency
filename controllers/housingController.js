const router = require("express").Router();

const housingServices = require("../services/housingServices.js");

const renderCreatePage = (req, res) => {
	res.render("create");
};

const renderRentPage = async (req, res) => {
	try {
		let rents = await housingServices.findAll();
		res.render("aprt-for-recent", { rents });
	} catch (error) {
		res.locals.error = error.message;
		res.render("aprt-for-recent");
	}
};

const createHousing = async (req, res) => {
	let { name, type, year, city, homeImage, description, availablePieces } = req.body;

	try {
		await housingServices.create(name, type, year, city, homeImage, description, availablePieces);
		res.redirect("/rent");
	} catch (error) {
		res.locals.error = error.message;
		res.render("create");
	}
};

router.get("/create", renderCreatePage);
router.get("/rent", renderRentPage);
router.post("/create", createHousing);

module.exports = router;
