const User = require("../models/User.js");

const register = function (name, username, password) {
	return User.create({ name, username, password });
};

const authServices = {
	register,
};

module.exports = authServices;
