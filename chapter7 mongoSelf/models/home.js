const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtil");

module.exports = class Home {
	constructor(houseName, price, location, rating, photoUrl, description, id) {
		this.houseName = houseName;
		this.price = price;
		this.location = location;
		this.rating = rating;
		this.photoUrl = photoUrl;
		this.description = description;
		this.id = id;
	}

	save() {
		if (this.id) {
			console.log("home update section ");
			const db = getDb();
			return db.collection("homes2").updateOne(
				{ _id: new ObjectId(this.id) },
				{
					$set: {
						houseName: this.houseName,
						price: this.price,
						location: this.location,
						rating: this.rating,
						photoUrl: this.photoUrl,
						description: this.description,
					},
				}
			);
		} else {
			console.log("new home add section");
			const db = getDb();
			return db.collection("homes2").insertOne(this);
		}
	}
	static fetchAll() {
		const db = getDb();
		return db.collection("homes2").find().toArray();
	}
	static findHomeById(homeId) {
		const db = getDb();
		return db.collection("homes2").findOne({ _id: new ObjectId(homeId) });
	}
	static deleteById(homeId) {
		const db = getDb();
		return db.collection("homes2").deleteOne({
			_id: new ObjectId(homeId),
		});
	}
};
