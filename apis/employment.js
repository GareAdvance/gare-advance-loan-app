const express = require("express");
const { createEmploymentData } = require("../controller/employment");
const { validateEmployment } = require("../validation/employment_validation");
const requireLogin = require("../config/auth");
const router = express.Router();

router.post("/employment/create", requireLogin, validateEmployment, createEmploymentData);

module.exports = router;