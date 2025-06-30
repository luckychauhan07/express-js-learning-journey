//CORE MODALS
const fs = require("fs");
const path = require("path");
//LOCAL MODULES
const rootPath = require("../utils/path");
const { error } = require("console");

module.exports = class favourite {
    static addToFavoruites(homeID) {
        console.log("lucky chauhan", homeID);
        const favouriteDataPath = path.join(rootPath, "data", "favourite.json");
        fs.readFile(favouriteDataPath, (err, data) => {
            const favouriteHomeList = JSON.parse(data);
            if (favouriteHomeList.includes(homeID)) {
                console.log("home is already added to favourites");
            } else {
                favouriteHomeList.push(homeID);
                console.log("home is added to favourites");
                fs.writeFile(
                    favouriteDataPath,
                    JSON.stringify(favouriteHomeList),
                    (err) => {
                        if (err) console.log("error while writting file");
                        else console.log("file write successfully");
                    }
                );
            }
        });
    }
    static getFavourites(callBack) {
        const favouriteDataPath = path.join(rootPath, "data", "favourite.json");
        fs.readFile(favouriteDataPath, (err, data) => {
            if (err) {
                console.log("file not found or read");
                return [];
            } else {
                return callBack(JSON.parse(data));
            }
        });
    }
    static deleteFavouriteById(homeID, callBack) {
        favourite.getFavourites((favourites) => {
            const newfavourites = favourites.filter(
                (favour) => favour !== homeID
            );
            console.log(newfavourites);
            const favouriteDataPath = path.join(
                rootPath,
                "data",
                "favourite.json"
            );
            fs.writeFile(
                favouriteDataPath,
                JSON.stringify(newfavourites),
                callBack
            );
        });
    }
};
