var express = require("express");
var router = express.Router();
const setPost = require("./setPost");
const setTag = require("./setTag");
const getPostId = require("./getPostId");
const getPerson = require("./getPerson");
const { getUserId } = require("../getUserId");
const { logger } = require("../../Log/DefLogger");
const send = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setPostRouter---start-- : ${ip}`);

    // token == salt_mail로 ID 가져오기.
    info.user_token = req.cookies["_KEN"];
    info.user_id = await getUserId(info.user_token);

    await setPost(info);
    let post = await getPostId(info.user_id);
    await setTag(info.tags, post);

    let first_tag = info.tags.slice(-1);
    // 과목 이외의 태그
    let rest_tag = info.tags.slice(0, -1);

    let receiver = await getPerson(first_tag, info.user_id);
    console.log(receiver);
    if (receiver === undefined) {
      res.end();
      logger.info(`------setPostRouter---no candidate-- : ${ip}`);
      return;
    }

    let title = `[Whyrano 요청] ${info.title} 질문에 답변요청이 있습니다.`;
    let html = `<h1>
                  [Whyrano] ${info.title} 질문에 답변요청이 있습니다.
                </h1>
  
                <a href="https://whyrano.site/post/${post}" target="_blank">
                  <button>
                    답변 달기
                  </button>
                </a>
    `;
    send(receiver.GMAIL_NM, title, html);
  } catch (e) {
    res.send(e);
    logger.error(`------setPostRouter---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] setPostRouter error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] setPostRouter error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] setPostRouter error`, "");
  } finally {
    res.end();
    logger.info(`------setPostRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
