var express = require("express");
var router = express.Router();
const updateNotice = require("./updateNotice");

router.post("/", async (req, res) => {
  try {
    console.log("------updateNotice---start--");
    const info = req.body;
    console.log(info);

    await updateNotice(info.post_id);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------updateNotice--end--\n");
    return;
  }
});

module.exports = router;
