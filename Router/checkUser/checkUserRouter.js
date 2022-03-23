var express = require("express");
var router = express.Router();
const checkUser = require("./checkUser");

router.post("/", async (req, res) => {
  try {
    console.log("------checkUser---start--");
    const info = req.body;
    res.json({ _KEN: await checkUser(info.post_id) });
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------checkUser--end--\n");
    return;
  }
});

module.exports = router;
