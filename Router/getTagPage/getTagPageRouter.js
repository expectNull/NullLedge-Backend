var express = require("express");
var router = express.Router();
const getAllTag = require("./getAllTag");
const getPostByTag = require("./getPostByTag");
const getPostById = require("./getPostById");

router.post("/", async (req, res) => {
  try {
    console.log("------getTagPage---start--");
    const info = req.body.TAG_NM;

    if (!info) {
      res.json(await getAllTag());
    } else {
      let posts = await getPostByTag(info);

      res.json(await getPostById(posts));
    }
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getTagPage--end--\n");
    return;
  }
});

module.exports = router;
