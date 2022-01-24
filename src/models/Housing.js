const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: [6, "Name should be at least 6 characters"],
	},
	type: {
		type: String,
		required: true,
		enum: ["Apartment", "Villa", "House"],
	},
	year: {
		type: Number,
		required: true,
		min: [1850, "Year should be between 1850 and 2021"],
		max: [2021, "Year should be between 1850 and 2021"],
	},
	city: {
		type: String,
		required: true,
		minlength: [4, "City should be at least 4 characters long"],
	},
	homeImage: {
		type: String,
		required: true,
		validate: [/^https?/, "Invalid image Url"],
	},
	description: {
		type: String,
		required: true,
		maxlength: [60, "Description should be a maximum of 60 characters"],
	},
	availablePieces: {
		type: Number,
		required: true,
		min: [0, "Available pieces should be between 0 and 10"],
		max: [10, "Available pieces should be between 0 and 10"],
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
