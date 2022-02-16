const getConnection = require("../../database/database");

async function getAnswer(id) {
  var sql = `select count(*) as cnt from post_tb where parent_post_id = ${id};`;
  let ret = 0;

  await getConnection(con => {
    con.query(sql, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }

      ret += rows.cnt;
    });
    con.release();
  });

  return ret;
}

module.exports = getAnswer;
