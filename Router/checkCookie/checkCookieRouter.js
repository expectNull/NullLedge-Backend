var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("------checkCookie---start--");
    const info = req.cookies;
    res.json({ _KEN: info._KEN });
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------checkCookie--end--\n");
    return;
  }
});

module.exports = router;
