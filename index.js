const app = require("express")();
const bodyParser = require("body-parser");

const port = 8080;
const cors = require("cors");
const setPostRouter = require("./Router/setPost/setPostRouter");
const getPostRouter = require("./Router/getPost/getPostRouter");

app.use(cors());
app.use(bodyParser.json());

app.use("/getpost", getPostRouter);
app.use("/setpost", setPostRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
