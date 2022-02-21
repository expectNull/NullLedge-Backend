var express = require("express");
var router = express.Router();
const pool = require("../../database/database");
const updateLike = require("./updateLike");

router.post("/", async (req, res) => {
  try {
    console.log("------setLike---start--");
    const info = req.body;
    console.log(info);
    let connection = await pool.getConnection(async conn => conn);

    updateLike(info.post_id, info.user_id, info.value);
    connection.release();
    console.log("------setLike--end--\n");
  } catch (e) {
    console.log(e);
  }
  return;
});

module.exports = router;
