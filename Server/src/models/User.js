module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    full_name: Sequelize.STRING,
    username: Sequelize.STRING,
    address: Sequelize.STRING,
    avatar_url: Sequelize.STRING,
    avatar_blob: Sequelize.BLOB("long"),
  });
  return User;
};
