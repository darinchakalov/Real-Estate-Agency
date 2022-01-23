const express = require("express");

const cookieParser = require("cookie-parser");
const router = require("./routes.js");
const { auth } = require("../middlewares/authMiddleware.js");

const expressConfig = function (app) {
	app.use(express.urlencoded({ extended: true }));

	app.use("/static", express.static("src/static"));
	app.use(express.static("src/static"));

	app.use(cookieParser());

	app.use(auth);
	router(app);
};

module.exports = expressConfig;
