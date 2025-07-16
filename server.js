const express = require("express");
const app = express();
const connectDB = require("./Config/db");
const eventRoutes = require("./routes/eventRoute");

connectDB();

app.use(express.json());
app.use("/api", eventRoutes);
// app.get("/", (req, res) => {
//   res.send("Home page");
// });
app.listen(5000, () => {
  console.log("Server is running at 5000");
});
