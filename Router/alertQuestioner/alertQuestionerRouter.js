// 답변이 달린 것을 이메일로 전송
var express = require("express");
var router = express.Router();
const getEmail = require("./getEmail");
const sendToQuestion = require("./sendToQuestion");

router.post("/", async (req, res) => {
  try {
    console.log("------alertQuestionerRouter---start--");
    const info = req.body;
    let gmail = await getEmail(info.user_id);
    await sendToQuestion(gmail);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------alertQuestionerRouter--end--\n");
    return;
  }
});

module.exports = router;
