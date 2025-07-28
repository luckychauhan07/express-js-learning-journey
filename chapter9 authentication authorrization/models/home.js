const favourite = require("./handleFavourite");
const mongoose = require("mongoose");
const homeSchema = mongoose.Schema({
	houseName: { type: String, required: true },
	location: { type: String, required: true },
	price: { type: Number, required: true },
	rating: { type: Number, required: true },
	photoUrl: String,
	description: String,
});
homeSchema.pre("findOneAndDelete", async function (next) {
	const homeID = this.getQuery()._id;
	await favourite.deleteMany({ houseId: homeID });
	next();
});

module.exports = mongoose.model("Home", homeSchema);
