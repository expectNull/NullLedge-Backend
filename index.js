const app = require("express")();
const bodyParser = require("body-parser");

const https = require("https");
const fs = require("fs");
// const options = {
//   ca: fs.readFileSync(
//     "/etc/letsencrypt/live/www.whyrano.site/fullchain.pem",
//     "utf-8",
//   ),
//   key: fs
//     .readFileSync("/etc/letsencrypt/live/www.whyrano.site/privkey.pem", "utf-8")
//     .toString(),
//   cert: fs
//     .readFileSync("/etc/letsencrypt/live/www.whyrano.site/cert.pem", "utf-8")
//     .toString(),
// };

const port = 5000;
const cors = require("cors");

const indexRouter = require("./Router/indexRouter");

const checkLikeRouter = require("./Router/checkLike/checkLikeRouter");

const getLandingPostRouter = require("./Router/getLandingPost/getLandingPostRouter");
const getAskRouter = require("./Router/getAsk/getAskRouter");
const getLikeRouter = require("./Router/getLike/getLikeRouter");
const getCommentItemRouter = require("./Router/getCommentItem/getCommentItemRouter");
const getCommentListRouter = require("./Router/getCommentList/getCommentListRouter");
const getReplysRouter = require("./Router/getReplys/getReplysRouter");
const getPostTagRouter = require("./Router/getPostTag/getPostTagRouter");
const getTagPageRouter = require("./Router/getTagPage/getTagPageRouter");

const setPostRouter = require("./Router/setPost/setPostRouter");
const setLikeRouter = require("./Router/setLike/setLikeRouter");
const setLikeInitRouter = require("./Router/setLike/setLikeInitRouter");
const setReplyRouter = require("./Router/setReply/setReplyRouter");
const setCommentRouter = require("./Router/setComment/setCommentRouter");
// const router = require("./Router/checkLike/checkLikeRouter");

app.use(cors());
app.use(bodyParser.json());
app.use(indexRouter);

app.use("/checkLike", checkLikeRouter);

app.use("/getAsk", getAskRouter);
app.use("/getCommentItem", getCommentItemRouter);
app.use("/getCommentList", getCommentListRouter);
app.use("/getLandingPost", getLandingPostRouter);
app.use("/getLike", getLikeRouter);
app.use("/getReplys", getReplysRouter);
app.use("/getPostTag", getPostTagRouter);
app.use("/getTagPage", getTagPageRouter);

app.use("/setReply", setReplyRouter);
app.use("/setpost", setPostRouter);
app.use("/setLike", setLikeRouter);
app.use("/setLikeInit", setLikeInitRouter);
app.use("/setComment", setCommentRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening at http://localhost:${port}`);
});

// https.createServer(options, app).listen(port, "0.0.0.0", () => {
//   console.log(`Listening at http://localhost:${port}`);
// });

// let options = {
//   key: fs.readFileSync("./localhost.key"),
//   cert: fs.readFileSync("./localhost.crt"),
//   requestCert: false,
//   rejectUnauthorized: false,
// };

// let server = https.createServer(options, app);

// server.listen(port, "0.0.0.0", function () {
//   console.log("Express server listening on port " + server.address().port);
// });
