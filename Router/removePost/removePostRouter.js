var express = require("express");
var router = express.Router();
const removePost = require("./removePost");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");
const checkUser = require("../checkUser/checkUser");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------removePost---start-- : ${ip}`);

    let compare_cookie = await checkUser(info.post_id);

    // check the user's cookie is same with post.
    if (compare_cookie !== req.cookies._KEN) {
      logger.error(`------removePost---injection-- : ${ip}\n ${e}`);
      send(
        "hyunsoo99kim@gmail.com",
        `[Err : Whyrano] removePost injection try`,
        "",
      );
      send(
        "qudgnl0422@naver.com",
        `[Err : Whyrano] removePost injection try`,
        "",
      );
      send(
        "shinhyoung26@gmail.com",
        `[Err : Whyrano] removePost injection try`,
        "",
      );
      res.json({ err: "다른 user 입니다." });
      res.end();
      return;
    }

    await removePost(info.post_id);
    res.json({ success: 1 });
  } catch (e) {
    logger.error(`------removePost---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] removePost error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] removePost error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] removePost error`, "");
  } finally {
    res.end();
    logger.info(`------removePost---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
