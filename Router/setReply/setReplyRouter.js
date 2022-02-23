var express = require("express");
var router = express.Router();
const setReply = require("../setReply/setReply");

router.post("/", async (req, res) => {
  try {
    console.log("------setReply---start--");
    const info = req.body;
    console.log(info);

    res.send(await setReply(info));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------setReply--end--\n");
    return;
  }
});

module.exports = router;
