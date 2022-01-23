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

const renderDetailsPage = async (req, res) => {
	let houseId = req.params.id;
	try {
		let house = await housingServices.findOne(houseId);
		console.log(house);
		res.render("details", house);
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const renderEditPage = async (req, res) => {
	let houseId = req.params.id;
	try {
		let house = await housingServices.findOne(houseId);
		console.log(house);
		res.render("edit", house);
	} catch (error) {
		res.locals.error = error.message;
		res.render("edit");
	}
};

router.get("/create", renderCreatePage);
router.get("/rent", renderRentPage);
router.post("/create", createHousing);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", renderEditPage);

module.exports = router;
