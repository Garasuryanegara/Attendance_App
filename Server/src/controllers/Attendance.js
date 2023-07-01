const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

const attendController = {
  getAll: async (req, res) => {
    try {
      const attendance = await db.Attendance.findAll();
      console.log(attendance);
      return res.send(attendance);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const attLog = await db.Attendance.findOne({
        where: {
          [Op.and]: [
            {
              user_id: req.params.id,
            },
            {
              [Op.and]: [
                {
                  createdAt: {
                    [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                  },
                },
                {
                  createdAt: {
                    [Op.lt]: moment("00:00:00", "hh:mm:ss")
                      .add(1, "days")
                      .format(),
                  },
                },
              ],
            },
          ],
        },
      });
      console.log(attLog);
      return res.send(attLog);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  insertClockIn: async (req, res) => {
    try {
      const clockIn = await db.Attendance.create({
        clockIn: moment().format("hh:mm"),
        user_id: req.params.id,
      });
      console.log(clockIn);
      return res.send({
        message: "Happy Working!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  InsertClockOut: async (req, res) => {
    try {
      const user = await db.Attendance.findOne({
        where: {
          [Op.and]: [
            { user_id: req.params.id },
            {
              [Op.and]: [
                {
                  createdAt: {
                    [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                  },
                },
                {
                  createdAt: {
                    [Op.lt]: moment("00:00:00", "hh:mm:ss")
                      .add(1, "days")
                      .format(),
                  },
                },
              ],
            },
          ],
        },
      });
      console.log(user);
      if (user) {
        if (!user.dataValues.clockOut) {
          await db.Attendance.update(
            { clockOut: moment().format("hh:mm") },
            {
              where: {
                [Op.and]: [
                  { user_id: req.params.id },
                  {
                    [Op.and]: [
                      {
                        createdAt: {
                          [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                        },
                      },
                      {
                        createdAt: {
                          [Op.lt]: moment("00:00:00", "hh:mm:ss")
                            .add(1, "days")
                            .format(),
                        },
                      },
                    ],
                  },
                ],
              },
            }
          );
          const hasil = await db.Attendance.findOne({
            where: { id: user.id },
          });
          return res.send({
            message: "Thank You!",
          });
        } else {
          res.send("You've already end your work session");
        }
      } else {
        res.send("You Haven't started your work stupid!");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = attendController;
