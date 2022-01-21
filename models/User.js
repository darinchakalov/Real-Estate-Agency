const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: {
		validate: [/^[A-Z][a-z]{4,} [A-Z][a-z]{3,}/i, "Please fill full name"],
		type: String,
		required: [true, "Full name is mandatory"],
	},
	username: {
		minlength: [5, "Username needs to bne at least 5 characters"],
		unique: true,
		type: String,
		required: [true, "Username name is mandatory"],
	},
	password: {
		minlength: [5, "Password needs to bne at least 4 characters"],
		type: String,
		required: [true, "Password name is mandatory"],
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
