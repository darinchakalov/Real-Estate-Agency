const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		unique: true,
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", async function (next) {
	try {
		this.password = await bcrypt.hash(this.password, 10);
		console.log("Hashing the password ...");
		next();
	} catch (error) {
		throw new Error("This happened when trying to hash the password: ", error);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
