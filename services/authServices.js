const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/credentials.js");

const register = function (name, username, password) {
	return User.create({ name, username, password });
};

const login = async function (username, password) {
	try {
		let user = await User.findOne({ username: username });
		let isPasswordCorrect = await user.checkPassword(password);
		return user;
	} catch (error) {
		throw new Error("User or password are incorrect", error);
	}
};

const createToken = function (user) {
	let payload = {
		user: user.username,
		id: user._id,
	};

	let token = jwt.sign(payload, SECRET);
	return token;
};

const userExists = function (username) {
	return User.findOne({ username: username });
};

const authServices = {
	register,
	login,
	createToken,
	userExists,
};

//TODO: create function that checks if user exists

module.exports = authServices;
