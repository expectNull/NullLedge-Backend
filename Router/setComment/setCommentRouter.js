var express = require("express");
var router = express.Router();
const setComment = require("../setComment/setComment");

router.post("/", async (req, res) => {
  try {
    console.log("------setComment---start--");
    const info = req.body;
    console.log(info);

    res.send(await setComment(info));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------setComment--end--\n");
    return;
  }
});

module.exports = router;
