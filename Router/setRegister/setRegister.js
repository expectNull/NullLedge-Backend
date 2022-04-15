const pool = require("../../database/database");
const bcrypt = require("bcrypt");

async function setRegister(user) {
  let salt = await bcrypt.genSalt();

  var sql = `insert into USER_TB 
  (GMAIL_NM, SALT_MAIL_NM, PASS_NM, SALT_NM, USER_NICK_NM, STATUS_CONTENT) 
  values (?, ?, ?, ?, ?, ?);`;
  let params = [
    user.email,
    await bcrypt.hash(user.email, salt),
    await bcrypt.hash(user.pw, salt),
    salt,
    user.nm,
    user.status,
  ];

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql, params);

  connection.release();

  return params[1];
}

module.exports = setRegister;
