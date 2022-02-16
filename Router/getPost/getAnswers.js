const getConnection = require("../../database/database");

function getAnswer(id) {
  var sql = `select count(*) as cnt from POST_TB where PARENT_POST_ID = ${id};`;
  let ret = 0;

  getConnection(con => {
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
