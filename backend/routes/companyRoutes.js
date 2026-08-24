const express = require("express");
const { getAllCompanies } = require("../controller/companyController");

const router = express.Router();

router.get("/all", getAllCompanies);

module.exports = router;
