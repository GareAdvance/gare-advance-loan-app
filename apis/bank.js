const express = require("express");
const { createBank, getBanks } = require("../controller/bank");
const { validateBank } = require("../validation/bank_validator");
const requireLogin = require("../config/auth");
const router = express.Router();

router.post("/bank/create", requireLogin, validateBank, createBank);
router.get("/bank/all", getBanks);

module.exports = router;