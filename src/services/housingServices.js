const Housing = require("../models/Housing.js");

const findLastThree = function () {
	return Housing.find().lean().sort({ _id: -1 }).limit(3);
};

const findAll = function () {
	return Housing.find().lean();
};

const findOne = function (id) {
	return Housing.findOne({ _id: id }).lean();
};

const create = function (name, type, year, city, homeImage, description, availablePieces, owner) {
	return Housing.create({ name, type, year, city, homeImage, description, availablePieces, owner: owner });
};

const edit = function name(id, house) {
	console.log(house);
	return Housing.findByIdAndUpdate(id, house, { runValidators: true });
};

const search = function (name) {};

const housingServices = {
	findLastThree,
	findAll,
	create,
	findOne,
	search,
	edit,
};

module.exports = housingServices;
