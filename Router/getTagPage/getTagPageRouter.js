var express = require("express");
var router = express.Router();
const getAllTag = require("./getAllTag");
const getPostByTag = require("./getPostByTag");
const getPostById = require("./getPostById");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body.TAG_NM;
    logger.info(`------getTagPage---start-- : ${ip}`);

    if (!info) {
      res.json(await getAllTag());
    } else {
      let posts = await getPostByTag(info);

      res.json(await getPostById(posts));
    }
  } catch (e) {
    logger.error(`------getTagPage---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] getTagPage error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] getTagPage error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] getTagPage error`, "");
  } finally {
    res.end();
    logger.info(`------getTagPage---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
