const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const routes = require("./routes");
const db = require("./models");
const User = db.User;
const Company = db.Company;
const Attendance = db.Attendance;
const Token = db.Token;

// User.sync();
// Company.sync();
// Attendance.sync();
// Token.sync();
db.sequelize.sync({ alter: true }).then(() => console.log("Sync Completed"));

app.use(cors());
app.use(express.json());
app.use("/avatar", express.static(`${__dirname}/public/avatar`));
app.use("/user", routes.userRoutes);
app.use("/company", routes.companyRoutes);
app.use("/attendance", routes.attendanceRoutes);
app.get("/", (req, res) => res.send("sequelized"));

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
