var express = require("express");
var router = express.Router();
const { getUserAuth } = require("./getUserAuth");

router.post("/", async (req, res) => {
  try {
    console.log("------getUserAuthRouter---start--");
    const info = req.body;

    res.json(await getUserAuth(info.token));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getUserAuthRouter--end--\n");
    return;
  }
});

module.exports = router;
