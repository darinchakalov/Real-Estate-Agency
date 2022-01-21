const User = require("../models/User.js");

const register = function (user, username, password) {
	return User.create(user, username, password);
};

const authServices = {
	register,
};

module.exports = authServices;
