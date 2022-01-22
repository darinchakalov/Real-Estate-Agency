const Housing = require("../models/Housing.js");

const findLastThree = function () {
	return Housing.find().lean().sort({ _id: -1 }).limit(3);
};

const findAll = function () {
	return Housing.find().lean();
};

const create = function (name, type, year, city, homeImage, description, availablePieces) {
	return Housing.create({ name, type, year, city, homeImage, description, availablePieces });
};

const housingServices = {
	findLastThree,
	findAll,
	create,
};

module.exports = housingServices;
