//CORE MODALS
const fs = require("fs");
const path = require("path");
//LOCAL MODULES
const rootPath = require("../utils/path");
const { error } = require("console");
const favourite = require("./handleFavourite");
module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl, id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }
    save() {
        const homeDataPath = path.join(rootPath, "data", "homes.json");
        Home.fetchAll((registerHomes) => {
            if (this.id) {
                //this is for replace the existing object
                registerHomes = registerHomes.map((home) => {
                    if (home.id === this.id) {
                        return this;
                    }
                    return home;
                });
            } else {
                //this for adding new object
                this.id = Math.random().toString();
                registerHomes.push(this);
            }

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
            return callBack([]);
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
    static deleteById(homeId, callBack) {
        favourite.deleteFavouriteById(homeId, (err) => {
            console.log("home is deleted from favourites list also");
        });
        const homeDataPath = path.join(rootPath, "data", "homes.json");
        Home.fetchAll((allHomes) => {
            const newHomesList = allHomes.filter((home) => home.id !== homeId);
            fs.writeFile(homeDataPath, JSON.stringify(newHomesList), callBack);
        });
    }
};
