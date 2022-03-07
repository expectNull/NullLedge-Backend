var express = require("express");
var router = express.Router();
const checkEmail = require("./checkEmail");
const checkNm = require("./checkNm");
const setRegister = require("./setRegister");

router.post("/", async (req, res) => {
  try {
    console.log("------setRegister---start--");
    const info = req.body;

    // Email 중복 여부 판단
    if (await checkEmail(info.email)) {
      console.log("-----sameEmail---------exist---\n");
      res.json({ error: "email" });
      res.end();
      return;
    }

    // 이미 Like Log가 존재하는 지 확인.
    if (await checkNm(info.nm)) {
      console.log("-----sameNm---------exist---\n");
      res.json({ error: "닉네임" });
      res.end();
      return;
    }

    await setRegister(info);
    res.json({ success: 1 });
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------setRegister--end--\n");
    return;
  }
});

module.exports = router;
