var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");

const setImg = require("./setImg");
const { getUserId } = require("../getUserId");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

const makeFolder = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

var img_nm = ["", ""];

//multer 의 diskStorage를 정의
var storage = multer.diskStorage({
  //경로 설정
  destination: async function (req, file, cb) {
    let user_id = await getUserId(req.cookies._KEN);
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let nm = `${year}-${month}-${date}`;

    makeFolder(`img/${user_id}`);
    makeFolder(`img/${user_id}/${nm}`);
    cb(null, `img/${user_id}/${nm}`);
    img_nm[0] = `/img/${user_id}/${nm}/`;
  },

  //실제 저장되는 파일명 설정
  filename: function (req, file, cb) {
    //파일명 설정을 돕기 위해 요청정보(req)와 파일(file)에 대한 정보를 전달함

    let nm = Date.now();

    //Multer는 어떠한 파일 확장자도 추가하지 않습니다.
    //사용자 함수는 파일 확장자를 온전히 포함한 파일명을 반환해야 합니다.
    var mimeType;

    switch (file.mimetype) {
      case "image/jpeg":
        mimeType = "jpg";
        break;
      case "image/png":
        mimeType = "png";
        break;
      case "image/gif":
        mimeType = "gif";
        break;
      case "image/bmp":
        mimeType = "bmp";
        break;
      default:
        mimeType = "jpg";
        break;
    }

    cb(null, `${nm}.${mimeType}`);
    img_nm[1] = `${nm}.${mimeType}`;
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.array("image"), async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    logger.info(`------setImg---start-- : ${ip}`);
    let url = img_nm.join("");

    res.json({ url: url });
  } catch (e) {
    logger.error(`------setComment---error-- : ${ip}\n ${e}`);
    send("shinhyoung26@gmail.com", `[Err : Whyrano] setComment error`, "");
  } finally {
    res.end();
    logger.info(`------setComment---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
