const Housing = require("../models/Housing.js");
const User = require("../models/User.js");

const findLastThree = function () {
	return Housing.find().lean().sort({ _id: -1 }).limit(3);
};

const findAll = function () {
	return Housing.find().lean();
};

const findOne = function (id) {
	return Housing.findOne({ _id: id }).populate("tenants");
};

const create = function (name, type, year, city, homeImage, description, availablePieces, owner) {
	return Housing.create({ name, type, year, city, homeImage, description, availablePieces, owner: owner });
};

const edit = function name(id, house) {
	return Housing.findByIdAndUpdate(id, house, { runValidators: true });
};

const del = function (id) {
	return Housing.findOneAndDelete(id);
};

const rent = async function (houseId, userId) {
	try {
		let house = await Housing.findById(houseId);
		let user = await User.findById(userId);
		house.tenants.push(user);
		return house.save();
	} catch (error) {
		return error;
	}
};

const search = function (name) {
	return Housing.find({ name: { $regex: name, $options: "i" } });
};

const housingServices = {
	findLastThree,
	findAll,
	create,
	findOne,
	search,
	edit,
	del,
	rent,
};

module.exports = housingServices;
