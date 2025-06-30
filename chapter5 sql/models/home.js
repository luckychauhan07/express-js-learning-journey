const db = require("../utils/databaseUtil");

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
		console.log(this.id);
		if (this.id) {
			console.log("update operation");
			return db.execute(
				"UPDATE homes SET housename = ?, price = ?, rating = ?, photourl = ?, description = ?, location = ? WHERE idhomes = ?",
				[
					this.houseName,
					this.price,
					this.rating,
					this.photoUrl,
					this.description,
					this.location,
					this.id, // assuming you have the id stored as `this.id`
				]
			);
		} else {
			console.log("new home operation");
			return db.execute(
				"INSERT INTO homes (housename,price,rating,photourl,description,location) VALUES(?,?,?,?,?,?)",
				[
					this.houseName,
					this.price,
					this.rating,
					this.photoUrl,
					this.description,
					this.location,
				]
			);
		}
	}
	static fetchAll() {
		return db.execute("SELECT * FROM homes");
	}
	static findHomeById(homeId) {
		return db.execute("SELECT * FROM homes WHERE idhomes =?", [homeId]);
	}
	static deleteById(homeId) {
		return db.execute("DELETE FROM homes WHERE idhomes =?", [homeId]);
	}
};
