const app = require("express")();
const bodyParser = require("body-parser");

const port = 8080;
const cors = require("cors");
const setPostRouter = require("./Router/setPost/setPostRouter");
const getMainRouter = require("./Router/getMainpost/getMainRouter");

app.use(cors());
app.use(bodyParser.json());

app.use("/getMainpost", getMainRouter);
app.use("/setpost", setPostRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
