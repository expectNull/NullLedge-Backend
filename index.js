const app = require("express")();
const bodyParser = require("body-parser");

const https = require("https");
const fs = require("fs");
const options = {
  ca: fs.readFileSync(
    "/etc/letsencrypt/live/whyrano.site/fullchain.pem",
    "utf-8",
  ),
  key: fs.readFileSync(
    "/etc/letsencrypt/live/whyrano.site/privkey.pem",
    "utf-8",
  ),
  cert: fs.readFileSync("/etc/letsencrypt/live/whyrano.site/cert.pem", "utf-8"),
};

let server = https.createServer(options, app);

const port = 8080;
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

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });
//http 통신

server.listen(port, function () {
  console.log("Express server listening on port " + server.address().port);
});
