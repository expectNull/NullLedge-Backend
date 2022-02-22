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
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------setLike--end--\n");
    return;
  }
});

module.exports = router;
