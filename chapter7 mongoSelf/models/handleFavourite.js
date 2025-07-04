const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtil");
const { findHomeById } = require("./home");

module.exports = class favourite {
	static async saveFavourite(homeID) {
		const db = getDb();
		const existing = await db
			.collection("favourire")
			.findOne({ favouriteId: new ObjectId(homeID) });
		if (existing) {
			console.log("this home is already added in the favourites");
		} else {
			const home = await findHomeById(homeID);
			if (!home) {
				throw new Error("home not found./");
			}
			const favouriteHome = {
				...home,
				favouriteId: home._id,
			};
			delete favouriteHome._id;
			return db.collection("favourire").insertOne(favouriteHome);
		}
	}
	static getFavourites() {
		const db = getDb();
		return db.collection("favourire").find().toArray();
	}
	static deleteFavouriteById(homeID) {
		const db = getDb();
		return db.collection("favourire").deleteOne({
			_id: new ObjectId(homeID),
		});
	}
};
