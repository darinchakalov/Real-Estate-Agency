const jwt = require("jsonwebtoken");
const { TOKEN_COOKIE_NAME, SECRET } = require("../config/credentials.js");

exports.auth = (req, res, next) => {
	const token = req.cookies[TOKEN_COOKIE_NAME];

	if (!token) {
		return next();
	}

	jwt.verify(token, SECRET, function (err, decodedToken) {
		if (err) {
			return res.redirect("/login");
		}
		res.user = decodedToken;
		res.locals.user = decodedToken;
		console.log(res.locals.user);
		next();
	});
};
