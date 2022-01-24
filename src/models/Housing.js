const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
		enum: ["Apartment", "Villa", "House"],
	},
	year: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	homeImage: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	availablePieces: {
		type: Number,
		required: true,
	},
	tenants: [
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

housingSchema.method("getTenants", function () {
	return this.tenants.map((x) => x.name).join(", ");
});

housingSchema.method("getAvailablePlaces", function () {
	return this.availablePieces - this.tenants.length;
});

const Housing = mongoose.model("Housing", housingSchema);

module.exports = Housing;
