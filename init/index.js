const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
main()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68715638417a0ff1bed9e92e",
  }));
  await Listing.insertMany(initData.data);
  console.log("data is initialised");
};

initDB();
