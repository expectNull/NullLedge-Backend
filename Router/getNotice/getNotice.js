const pool = require("../../database/database");

async function getParentNm(id) {
  if (id == -1) return;

  var sql = `
  SELECT POST_NM
  from POST_TB
  where POST_ID = ?;`;
  let params = id;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows[0].POST_NM;
}

async function getItem(post, item) {
  let ret = {
    notice_id: item.POST_ID,
    post_id: post.user_post_id,
    nm: post.nm,
    parent_id: post.user_parent_id,
    parent_nm: await getParentNm(post.user_parent_id),
    type_gb: item.TYPE_GB,
    ymd: item.POST_YMD,
    user_nm: item.USER_NICK_NM,
    content: item.CONTENT,
  };

  return ret;
}

async function getUserPost(user) {
  var sql = `
  SELECT POST_ID, POST_NM, PARENT_POST_ID
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
  where SALT_MAIL_NM = ?;`;
  let params = [user];
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  for (let i = 0; i < rows.length; i++) {
    ret.push({
      user_post_id: rows[i].POST_ID,
      nm: rows[i].POST_NM,
      user_parent_id: rows[i].PARENT_POST_ID,
    });
  }
  connection.release();

  return await getNotice(ret);
}

async function getNotice(post) {
  let ret = [];
  let cnt = 0;

  for (let i = 0; i < post.length; i++) {
    var sql = `SELECT POST_ID, USER_NICK_NM, POST_YMD, CONTENT, TYPE_GB, CHECK_GB
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
  where PARENT_POST_ID = ? and (CHECK_GB != 0 and CHECK_GB != -1);`;
    let params = post[i].user_post_id;

    let connection = await pool.getConnection(async conn => conn);
    let [rows, col] = await connection.query(sql, params);

    if (rows.length > 0) ret.push(await getItem(post[i], rows[0]));
    if (rows.length > 0 && rows[0].CHECK_GB == 2) cnt++;
    connection.release();
  }

  return {
    length: cnt,
    content: ret,
  };
}

module.exports = { getUserPost };
