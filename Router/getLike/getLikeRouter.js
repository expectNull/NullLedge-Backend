var express = require("express");
var router = express.Router();
const getLike = require("./getLike");

router.post("/", async (req, res) => {
  try {
    console.log("------getLike---start--");
    const info = req.body;
    console.log(info);

    res.json(await getLike(info.post_id));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getLike--end--\n");
    return;
  }
});

module.exports = router;
