//CORE MODALS
const fs = require("fs");
const path = require("path");
//LOCAL MODULES
const rootPath = require("../utils/path");
const { error } = require("console");
module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl, id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.id = Math.random().toString();
    }
    save() {
        Home.fetchAll((registerHomes) => {
            registerHomes.push(this);
            const homeDataPath = path.join(rootPath, "data", "homes.json");
            fs.writeFile(homeDataPath, JSON.stringify(registerHomes), (err) => {
                console.log("file write concluded", error);
            });
        });
    }
    static fetchAll(callBack) {
        const homeDataPath = path.join(rootPath, "data", "homes.json");
        fs.readFile(homeDataPath, (err, data) => {
            if (!err) {
                return callBack(JSON.parse(data));
            }
            return callBack(registerHomes);
        });
    }
    static findHomeById(homeId, callBack) {
        const homeDataPath = path.join(rootPath, "data", "homes.json");
        fs.readFile(homeDataPath, (err, data) => {
            const homeList = JSON.parse(data);
            homeList.forEach((eachHome) => {
                if (eachHome.id === homeId) {
                    return callBack(eachHome);
                }
            });
        });
    }
};
