var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("------removeCookie---start--");
    res.clearCookie("_KEN");
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------removeCookie--end--\n");
    return;
  }
});

module.exports = router;
