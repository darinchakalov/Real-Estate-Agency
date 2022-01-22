const Housing = require("../models/Housing.js");

const findLastThreeHouses = function () {
	return Housing.find().sort({ _id: -1 }).limit(3);
};

const housingServices = {
	findLastThreeHouses,
};

module.exports = housingServices;
