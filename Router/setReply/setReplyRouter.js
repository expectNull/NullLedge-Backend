var express = require("express");
var router = express.Router();
const setReply = require("../setReply/setReply");
const checkReply = require("./checkReply");
const { logger } = require("../../Log/DefLogger");
const getInfoEmail = require("../getInfoEmail");
const send = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setReply---start-- : ${ip}`);
    info.user_token = req.cookies["_KEN"];

    if (await checkReply(info)) {
      logger.info(`------setReply---exist Reply-- : ${ip}`);
      res.json({ err: "이미 답변이 존재합니다." });
      res.end();
      return;
    }
    await setReply(info);
    res.json({ success: 1 });

    let receiver = await getInfoEmail(info.parent_post_id);
    // 예시임. 접어서 두셈.
    let title = `[Whyrano 답글] ${receiver.POST_NM} 질문에 답변이 달렸습니다.`;
    let html = `<h1>
                  [Whyrano] ${receiver.POST_NM} 질문에 답변이 달렸습니다.
                </h1>
  
                <a href="https://whyrano.site/post/${info.parent_post_id}" target="_blank">
                  <button>
                    답변 확인
                  </button>
                </a>
    `;
    send(receiver.GMAIL_NM, title, html);
  } catch (e) {
    logger.error(`------setReply---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] setReply error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] setReply error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] setReply error`, "");
  } finally {
    res.end();
    logger.info(`------setReply---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
