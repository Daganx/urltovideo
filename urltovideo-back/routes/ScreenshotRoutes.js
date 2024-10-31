const express = require("express");
const { generateScreenshot } = require("../controllers/ScreenshotController");

const router = express.Router();

router.post("/generate-screenshot", generateScreenshot);

module.exports = router;
