// scripts/backfill-owner.js
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/gharYatra";
const OWNER_ID = "68ff3b896e93f9c27e6dec1b";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    // Add owner and default geometry to all listings
    const listingsWithOwner = initData.data.map((listing) => ({
        ...listing,
        owner: OWNER_ID,
        geometry: {
            type: "Point",
            coordinates: [77.5946, 12.9716] // Default Bangalore coordinates
        }
    }));
    
    await Listing.insertMany(listingsWithOwner);
    console.log("Data initialized with owner and geometry");
};

initDB()
    .then(() => {
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
