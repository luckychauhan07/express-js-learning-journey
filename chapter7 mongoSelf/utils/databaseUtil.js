const mongoDb = require("mongodb");

const mongoClient = mongoDb.MongoClient;
const URL =
	"mongodb+srv://chauhan12lucky:lucky%40123@luckychauhan.kmadz3u.mongodb.net/?retryWrites=true&w=majority&appName=luckychauhan";

let _db;

const mongoConnect = (callback) => {
	mongoClient
		.connect(URL)
		.then((client) => {
			_db = client.db("airbnb2");
			callback();
		})
		.catch((err) => {
			console.log("mongo not connected");
		});
};

const getDb = () => {
	if (!_db) {
		throw new Error("mongo not connected");
	} else {
		return _db;
	}
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
