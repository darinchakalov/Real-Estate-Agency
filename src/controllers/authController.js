const router = require("express").Router();
const authServices = require("../services/authServices.js");
const { TOKEN_COOKIE_NAME } = require("../config/constants.js");

const renderLoginPage = (req, res) => {
	res.render("auth/login");
};

const loginUser = async (req, res) => {
	let { username, password } = req.body;
	try {
		let user = await authServices.login(username, password);

		let token = await authServices.createToken(user);

		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});

		res.redirect("/");
	} catch (error) {
		res.locals.error = error.message;
		res.render("auth/login");
	}
};

const renderRegisterPage = (req, res) => {
	res.render("auth/register");
};

const registerUser = async (req, res) => {
	let { name, username, password, rePass } = req.body;
	if (password !== rePass) {
		return res.status(400).render("auth/register", { error: "Passwords don't match" });
	}

	let exists = await authServices.userExists(username);
	if (exists) {
		return res.status(400).render("auth/register", { error: "User already exists" });
	}

	try {
		await authServices.register(name, username, password);
		//After successful registration create login request:
		let user = await authServices.login(username, password);
		let token = await authServices.createToken(user);
		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});
		res.redirect("/");
	} catch (error) {
		res.locals.error = error.message;
		res.render("auth/register");
	}
};

const logout = (req, res) => {
	if (req.user) {
		delete req.user;
	}
	res.clearCookie(TOKEN_COOKIE_NAME);
	res.redirect("/");
};

router.get("/login", renderLoginPage);
router.post("/login", loginUser);
router.get("/register", renderRegisterPage);
router.post("/register", registerUser);
router.get("/logout", logout);

module.exports = router;
