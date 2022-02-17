const pool = require("../../database/database");
const getAnswer = require("./getAnswers");
const getLike = require("./getLikes");

async function getItem(item) {
  let post_id = item.POST_ID;

  let ret = JSON.stringify({
    post_id: post_id,
    ans_cnt: await getAnswer(post_id),
    like_cnt: await getLike(post_id),
    view_cnt: item.VIEW_CNT,
    post_nm: item.POST_NM,
    post_ymd: item.POST_YMD,
    user_nm: item.USER_NICK_NM,
  });
  return ret;
}

async function getPost() {
  // type_gb = 0으로 질문글 확인, order by를 통해 최신글 부터
  var sql = `select POST_ID, POST_NM, POST_YMD, VIEW_CNT, USER_NICK_NM
    from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
    where type_gb = 0
    order by POST_YMD DESC;`;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  for (let i = 0; i < rows.length; i++) {
    ret.push(await getItem(rows[i]));
  }

  // var sql = `insert into post_tb
  // (PROBLEM_ID, USER_ID, TYPE_GB, POST_NM, POST_YMD,
  //   POST_TAGS_NM, CONTENT, VIEW_CNT, PARENT_POST_ID,  KIND_POINT_AMT)
  // values (?, ?, ?, ?, ?,
  //   ?, ?, ?, ?, ?);`;

  // // date는 new Date().toISOString().split(".")[0]로 나타내면 timezone을 분리해서 가져올 수 있다.
  // // mySQL 내에서는 영국을 기준으로 시간이 정해져 있어서 이거 수정해야 할듯.
  // var param = [
  //   14,
  //   1,
  //   0,
  //   'What does "use strict" do in JavaScript, and what is the?',
  //   new Date().toISOString().split(".")[0],
  //   "JS system jslint",
  //   "Anyway Something gonna be here",
  //   0,
  //   -1,
  //   0,
  // ];

  // await connection.query(sql, param);

  connection.release();

  return ret;
}

const temp = async () => {
  console.log(await getPost());
};

temp();
