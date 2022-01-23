const mongoose = require("mongoose");
const { DB_PASS } = require("./constants.js");

const initDB = function () {
	return mongoose.connect(
		`mongodb+srv://realestateuser:${DB_PASS}@cluster0.ozv6x.mongodb.net/real-estate-db?retryWrites=true&w=majority`
	);
};

module.exports = initDB;
