const router = require("express").Router();
const authServices = require("../services/authServices.js");

const renderLoginPage = (req, res) => {
	res.render("auth/login");
};

const renderRegisterPage = (req, res) => {
	res.render("auth/register");
};

const registerUser = async (req, res) => {
	let { name, username, password, rePass } = req.body;
	if (password !== rePass) {
		return res.status(400).render("auth/register", { error: "Passwords don't match" });
	}
	try {
		await authServices.register(name, username, password);
		res.redirect("/");
	} catch (error) {
		res.locals.error = error.message;
		res.render("auth/register");
	}
};

router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);
router.post("/register", registerUser);

module.exports = router;
