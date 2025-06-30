const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongo_url =
    "mongodb+srv://chauhan12lucky:lucky%40123@luckychauhan.kmadz3u.mongodb.net/?retryWrites=true&w=majority&appName=luckychauhan";
let _db;
const mongoConnect = (callback) => {
    mongoClient
        .connect(mongo_url)
        .then((client) => {
            callback();
            _db = client.db("airbnb");
        })
        .catch((err) => {
            console.log(err);
        });
};
const getDb = () => {
    if (!_db) {
        throw new Error("mongo not connected");
    }
    return _db;
};
module.exports = mongoConnect;
module.exports = getDb;
