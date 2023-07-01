const db = require("../models");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const private_key = process.env.private_key;
const URL_IMAGE = process.env.URL_IMAGE;
const url = process.env.URL;
const sharp = require("sharp");

const userController = {
  insertUser: async (req, res) => {
    try {
      const { email, password, full_name, username, Company_id, address } =
        req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);
      const newUser = await db.User.create({
        email,
        password: hashPassword,
        full_name,
        username,
        Company_id,
        address,
      });
      console.log(newUser.dataValues);
      res.send({
        message: "Registration Success!",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { usermail, password } = req.body;
      console.log(req.body);
      const user = await db.User.findOne({
        where: { [Op.or]: [{ email: usermail }, { username: usermail }] },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        console.log(match);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const token = jwt.sign(payload, private_key, {
            expiredIn: "2h",
          });
          console.log(token);
          return res.send({
            message: ` Hi ${user.dataValues.full_name}, You're successfully logged in!`,
            value: user,
            token: token,
          });
        } else {
          res.send({ message: "wrong password" });
        }
      } else {
        res.send({ message: "user not found" });
      }
    } catch (err) {
      res.status(500).send({
        messag: err.message,
      });
    }
  },
  getByToken: async (req, res) => {
    const user = jwt.verify(req.query.token, private_key);
    console.log(user);
    await db.Attendance.findOne({
      where: {
        id: user.id,
      },
    });
    return res.send(user);
  },
  loginV2: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      // const user = await db.User.findOne({
      //   where: email,
      // });
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        console.log(match);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const generateToken = nanoid();
          const token = await db.Token.create({
            token: generateToken,
            expired: moment().add(1, "days").format(),
            payload: JSON.stringify(payload),
            status: "LOGIN",
          });
          console.log(token);
          return res.send({
            message: ` Hi, You're successfully logged in!`,
            value: user,
            token: token,
          });
        } else {
          res.send({ message: "wrong password" });
        }
      } else {
        res.send({ message: "user not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getByTokenV2: async (req, res, next) => {
    try {
      console.log(req.headers);
      let token = req.headers.authorization;
      console.log(token);
      // token = token.split(" ")[1];
      let p = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });

      // select * from tokes where token ="abc" and expired >= "2023-05-23"
      // and valid = true

      if (!p) {
        throw new Error("token has expired");
      }
      console.log(p.dataValues);
      user = await db.User.findOne({
        where: {
          id: JSON.parse(p.dataValues.payload).id,
        },
      });
      //id,email,nama,password,dll

      delete user.dataValues.password;

      req.user = user;
      next();
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByToken: async (req, res) => {
    res.send(req.user);
  },
  generateTokenByEmail: async (req, res) => {
    try {
      const { email } = req.query;

      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log(user);

      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );

        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(5, "minutes").format(),
          token: generateToken,
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT-PASSWORD",
        });

        await mailer({
          subject: "helloooooo",
          to: "jdxnjrnjl@internetkeno.com",
          text: url + token.dataValues.token,
        });

        console.log("terkirim");

        return res.send({ message: "silahkan check email anda" });
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { token } = req.query;
      const { password } = req.body.user;
      const { id } = req.user;

      console.log(id);

      const hashPassword = await bcrypt.hash(password, 10);
      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      res.send({
        message: "password successfully updated!",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  uploadAvatar: async (req, res) => {
    const { filename } = req.file;
    await db.User.update(
      {
        avatar_url: URL_IMAGE + filename,
      },
      {
        where: { id: req.params.id },
      }
    );
    await db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => res.send(result));
  },
  uploadAvatarV2: async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize(250, 250)
      .png()
      .toBuffer();

    var fullUrl =
      req.protocol +
      "://" +
      req.get("host") +
      "/user/image/render/" +
      req.params.id;
    await db.User.update(
      {
        avatar_url: fullUrl,
        avatar_blob: buffer,
      },
      {
        where: { id: req.params.id },
      }
    );
    // await db.User.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    // }).then((result) => res.send(result));
    res.send(buffer);
  },
  renderAvatar: async (req, res) => {
    try {
      await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => {
        res.set("content-type", "image/png");
        res.send(result.dataValues.avatar_blob);
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
