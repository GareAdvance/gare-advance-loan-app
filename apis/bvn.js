const express = require("express");
const { createBVN, getAllBVN, getBVN } = require("../controller/bvn");
const { bvnValidator } = require("../validation/bvn_validation");
const requireLogin = require("../config/auth");
const router = express.Router();

router.post("/bvn/new", requireLogin, bvnValidator, createBVN);
router.get("/bvn/all", requireLogin, getAllBVN);
router.get("/bvn/single", requireLogin, getBVN);

module.exports = router;