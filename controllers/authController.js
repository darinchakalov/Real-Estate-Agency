const router = require("express").Router();
const authServices = require("../services/authServices.js");

const renderLoginPage = (req, res) => {
	res.render("auth/login");
};

const renderRegisterPage = (req, res) => {
	res.render("auth/register");
};

const registerUser = async (req, res) => {
	console.log(req.body);
	let { user, username, password } = req.body;
	try {
		await authServices.register(user, username, password);
		res.redirect("/login");
	} catch (error) {
		res.locals.error = error.message;
		res.render("auth/register");
	}
};

router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);
router.post("/register", registerUser);

module.exports = router;
