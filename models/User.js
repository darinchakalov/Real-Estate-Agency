const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: {
		validate: [/^[A-Za-z]{3,} [A-Za-z]{3,}/i, "Please fill full name"],
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
		minlength: [4, "Password needs to be at least 4 characters"],
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

userSchema.method("checkPassword", function (password) {
	return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
