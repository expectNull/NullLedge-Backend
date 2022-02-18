var express = require("express");
var router = express.Router();
const pool = require("../../database/database");
const getPost = require("./getPost");

router.post("/", async (req, res) => {
  try {
    const ret = await getPost();
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(ip);

    res.json(ret);
    res.end();
  } catch (e) {
    console.log(e);
  }

  return;
});

module.exports = router;
