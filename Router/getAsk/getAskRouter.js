var express = require("express");
var router = express.Router();
const getAsk = require("./getAsk");

router.post("/", async (req, res) => {
  try {
    console.log("------getAskRouter---start--");

    const info = req.body;
    console.log(info);
    const ret = await getAsk(info.post_id);

    res.json(ret);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getAskRouter--end--\n");
    return;
  }
});

module.exports = router;
