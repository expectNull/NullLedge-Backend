var express = require("express");
var router = express.Router();
const { getUserTok, getUserNm } = require("./getUser");

router.post("/", async (req, res) => {
  try {
    console.log("------getUserInfoRouter---start--");
    const info = req.body;

    console.log(info);
    if (info.user === undefined) {
      // mypage로 들어옴 TOK로 정보 확인.
      res.json(await getUserTok(info.token));
    } else {
      res.json(await getUserNm(info.user));
    }
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getUserInfoRouter--end--\n");
    return;
  }
});

module.exports = router;
