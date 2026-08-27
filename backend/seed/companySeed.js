const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("../model/companyModel");

dotenv.config({ path: "../config.env" });

// connect ous database
const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

// Your bank/company list
const banks = [
  "Janata Bank",
  "HDFC Bank",
  "Bangladesh Bank",
  "Sonali Bank",
  "Rupali Bank",
  "Bkash Bank",
  "Punjab National Bank",
  "State Bank of India",
  "Bank of Baroda",
  "Punjab & Sind Bank",
  "Canara Bank",
  "Bank of India",
  "ICICI Bank",
  "Union Bank of India",
  "HDFC Bank",
  "Punjab National Bank",
  "State Bank of India",
  "Bank of Baroda",
  "Punjab & Sind Bank",
  "Canara Bank",
  "Bank of India",
  "ICICI Bank",
  "Union Bank of India",
  "HDFC Bank",
  "Punjab National Bank",
  "State Bank of India",
  "Bank of Baroda",
  "Punjab & Sind Bank",
  "Canara Bank",
];

const addCompnies = async () => {
  try {
    await Company.deleteMany();

    const fromatted = banks.map((name) => ({
      name: name.trim(),
      totalReviews: 0,
      positiveCount: 0,
      negativeCount: 0,
      nutralCount: 0,
      reviews: [],
    }));

    await Company.insertMany(fromatted);
    console.log("Companies added successfully");
    process.exit();
  } catch (error) {
    console.log("Error adding companies", error);
    process.exit(1);
  }
};

const deleteCompanies = async () => {
  try {
    await Company.deleteMany();
    console.log("All Companies Deleted Successfully");
    process.exit();
  } catch (error) {
    console.log("Error deleting companies", error);
    process.exit(1);
  }
};

const run = async () => {
  const arg = process.argv[2];
  if (arg === "--add") {
    await addCompnies();
  } else if (arg === "--delete") {
    await deleteCompanies();
  } else {
    console.log("Use --add to add company or --delete to delete company");
    process.exit(0);
  }
};

run();
