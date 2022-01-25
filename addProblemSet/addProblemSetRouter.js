var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const getConnection = require("../database/database");

async function addTags(page) {
  // solved.ac - search - 문제 검색하기
  // page에 있는 문제 정보 가져오기 (1페이지를 기준으로 만든 함수)
  let ret = [];

  // async - await을 사용하지 않는 경우 비동기적으로 동작
  // fetch -> json 하는 순서 모두 await 사용.
  const data = await (
    await fetch(
      `https://solved.ac/api/v3/search/problem?query=%20&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  ).json();

  // 가지고 온 문제들의 정보를 필요한 부분만 사용
  data.items.forEach(element => {
    let temp = [];
    temp["problemId"] = element.problemId;
    temp["titleKo"] = element.titleKo;
    temp["tags"] = [];

    // tag원소들 중 태그 이름만 가져옴.
    element.tags.forEach(item => {
      temp["tags"].push(item.key);
    });

    temp["tags"] = JSON.stringify(temp["tags"]);

    ret.push(temp);
  });

  // ret에는 100개의 문제정보가 저장됨
  // 반복문 내에서 문자열로 찾을 경우 해당 정보를 가져올 수 있음
  // ret[i]["problemId"] => 문제의 번호 == id
  // ret[i]["titleKo"] => 문제의 이름
  // ret[i]["tags"] => 문제 태그 JSON(태그가 없을 수도 있음.)
  ret.forEach(item => {
    console.log(item["tags"]);
  });

  return ret;
}

async function getProblem() {
  let problemSet = await addTags(page);

  if (problemSet.length == 0) {
    clearInterval(problemSet);
  }

  router.get("/", async (req, res) => {
    const response = req.body;
    console.log(response);
    var sql =
      "INSERT INTO PROBLEM_SET_TB(PROBLEM_ID, TAGS_NM, HASH_ID) VALUES(?,?,?)"; // ON DUPLICATE KEY UPDATE (TAGS_NM, HASH_ID) = (?,?)";
    // commitlog 테이블에서 구직자의 이름, 추천자의 이름, 이력 내용이 맞는 것을 찾아서 삭제한다.

    getConnection(con => {
      for (let i = 0; i < problemSet.length; i++) {
        var params = [
          problemSet[i]["titleKo"],
          problemSet[i]["problemId"],
          problemSet[i]["tags"],
          problemSet[i]["problemId"] * 1000,
          // problemSet[i]["tags"],
          // problemSet[i]["problemId"],
        ];

        con.query(sql, params, function (err, rows, fields) {
          if (err) {
            console.log(err);
          } else {
            console.log(`added ${params}`);
          }
        });
      }
      // 쿼리문 수행.
      con.release();
    });

    res.end();
  });

  page++;
}

var page = 1;
var updateProblem = setInterval(async () => {
  await getProblem();
}, 1000);

module.exports = router;
