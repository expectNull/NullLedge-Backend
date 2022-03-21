const app = require("express")();
const bodyParser = require("body-parser");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const indexRouter = require("./Router/indexRouter");

const checkLikeRouter = require("./Router/checkLike/checkLikeRouter");
const checkCookieRouter = require("./Router/checkCookie/checkCookieRouter");

const getLandingPostRouter = require("./Router/getLandingPost/getLandingPostRouter");
const getAskRouter = require("./Router/getAsk/getAskRouter");
const getLikeRouter = require("./Router/getLike/getLikeRouter");
const getCommentItemRouter = require("./Router/getCommentItem/getCommentItemRouter");
const getCommentListRouter = require("./Router/getCommentList/getCommentListRouter");
const getReplysRouter = require("./Router/getReplys/getReplysRouter");
const getPostTagRouter = require("./Router/getPostTag/getPostTagRouter");
const getTagPageRouter = require("./Router/getTagPage/getTagPageRouter");
const getLoginRouter = require("./Router/getLogIn/getLoginRegister");
const getUserInfoRouter = require("./Router/getUserInfo/getUserInfoRouter");
const getUserPostRouter = require("./Router/getUserPost/getUserPostRouter");

const setRegisterRouter = require("./Router/setRegister/setRegisterRouter");
const setPostRouter = require("./Router/setPost/setPostRouter");
const setLikeRouter = require("./Router/setLike/setLikeRouter");
const setLikeInitRouter = require("./Router/setLike/setLikeInitRouter");
const setReplyRouter = require("./Router/setReply/setReplyRouter");
const setCommentRouter = require("./Router/setComment/setCommentRouter");

const removeCookieRouter = require("./Router/removeCookie/removeCookieRouter");
const removePostRouter = require("./Router/removePost/removePostRouter");

// middleware 순서 이슈??
// https://stackoverflow.com/questions/16209145/how-can-i-set-cookie-in-node-js-using-express-framework
app.use(cookieParser());

// https://kosaf04pyh.tistory.com/152
// origin 설정 필요한가봄.
app.use(
  cors({
    // origin: "https://whyrano.site",
    origin: [
      "https://localhost:3000",
      "https://whyrano.site",
      "https://tadfafsaest.whyrano.site",
    ],
    credentials: true,
  }),
);
// app.use(cors);
app.use(bodyParser.json());
app.use(indexRouter);

app.use("/checkLike", checkLikeRouter);
app.use("/checkCookie", checkCookieRouter);

app.use("/getAsk", getAskRouter);
app.use("/getCommentItem", getCommentItemRouter);
app.use("/getCommentList", getCommentListRouter);
app.use("/getLandingPost", getLandingPostRouter);
app.use("/getLike", getLikeRouter);
app.use("/getReplys", getReplysRouter);
app.use("/getPostTag", getPostTagRouter);
app.use("/getTagPage", getTagPageRouter);
app.use("/getLogin", getLoginRouter);
app.use("/getUser", getUserInfoRouter);
app.use("/getUserPost", getUserPostRouter);

app.use("/setRegister", setRegisterRouter);
app.use("/setReply", setReplyRouter);
app.use("/setpost", setPostRouter);
app.use("/setLike", setLikeRouter);
app.use("/setLikeInit", setLikeInitRouter);
app.use("/setComment", setCommentRouter);

app.use("/removeCookie", removeCookieRouter);
app.use("/removePost", removePostRouter);

const port = 5050;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
