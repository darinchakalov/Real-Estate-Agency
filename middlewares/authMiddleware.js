const jwt = require("jsonwebtoken");
const { TOKEN_COOKIE_NAME, SECRET } = require("../config/credentials.js");

exports.auth = (req, res, next) => {
	const token = req.cookies[TOKEN_COOKIE_NAME];

	if (!token) {
		next();
	}

	jwt.verify(token, SECRET, (err, decodedToken) => {
		if (err) {
			res.status(401).redirect("/login");
		}
		res.user = decodedToken;
		res.locals.user = decodedToken;
		next();
	});
};
