const router = require("express").Router();

const housingServices = require("../services/housingServices.js");
const { isAuth, isGuest } = require("../middlewares/authMiddleware.js");

const renderCreatePage = (req, res) => {
	console.log(req.user);

	res.render("create");
};

const createHousing = async (req, res) => {
	let { name, type, year, city, homeImage, description, availablePieces } = req.body;
	let ownerId = res.user.id;
	try {
		await housingServices.create(name, type, year, city, homeImage, description, availablePieces, ownerId);
		res.redirect("/rent");
	} catch (error) {
		res.locals.error = error.message;
		res.render("create");
	}
};

const renderDetailsPage = async (req, res) => {
	try {
		let housing = await housingServices.findOne(req.params.id);
		let house = housing.toObject();
		let isOwner = false;
		if (res.locals.user) {
			console.log("here");
			isOwner = res.locals.user.id == house.owner;
		}
		let tenants = housing.getTenants();
		let availablePlaces = housing.getAvailablePlaces();
		let isAvailable = availablePlaces > 0;
		let isRendedCurrentUser = house.tenants.some((x) => x._id == res.user?.id);
		res.render("details", { ...house, isOwner, isAvailable, tenants, availablePlaces, isRendedCurrentUser });
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
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

const renderEditPage = async (req, res) => {
	let houseId = req.params.id;
	try {
		let house = await housingServices.findOne(houseId);
		res.render("edit", house);
	} catch (error) {
		res.locals.error = error.message;
		res.render("edit");
	}
};

const editHouse = async (req, res) => {
	let houseId = req.params.id;
	let house = req.body;
	try {
		await housingServices.edit(houseId, house);
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("edit");
	}
};

const deleteHouse = async (req, res) => {
	let houseId = req.params.id;
	try {
		await housingServices.del(houseId);
		res.redirect("/rent");
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const renting = async (req, res) => {
	try {
		housingServices.rent(req.params.id, res.user.id);
		res.redirect(301, `/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

router.get("/create", isAuth, renderCreatePage);
router.get("/rent", renderRentPage);
router.post("/create", createHousing);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", isAuth, renderEditPage);
router.post("/edit/:id", editHouse);
router.get("/delete/:id", isAuth, deleteHouse);
router.get("/renting/:id", isAuth, renting);

module.exports = router;
