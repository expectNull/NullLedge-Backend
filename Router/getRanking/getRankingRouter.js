var express = require("express");
var router = express.Router();
const { getRanking } = require("./getRanking");

router.post("/", async (req, res) => {
  try {
    console.log("------getRanking---start--");

    res.json(await getRanking());
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getRanking--end--\n");
    return;
  }
});

module.exports = router;
