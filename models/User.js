const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
});

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (error) {
		throw new Error("This happened when trying to hash the password: ", error);
	}
});

module.exports = User;
