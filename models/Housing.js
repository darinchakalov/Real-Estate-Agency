const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
	},
	city: {
		type: String,
		required: true,
	},
	homeImage: {
		type: String,
		required: true,
	},
	propertyDescription: {
		type: String,
		required: true,
	},
	availablePieces: {
		type: Number,
		required: true,
	},
	rendedHome: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Housing = mongoose.model("Housing", housingSchema);

module.exports = Housing;
