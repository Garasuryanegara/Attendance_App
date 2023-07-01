module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    "Tokens",
    {
      token: Sequelize.STRING,
      expired: Sequelize.STRING,
      payload: Sequelize.STRING,
      valid: { type: Sequelize.BOOLEAN, defaultValue: true },
      status: Sequelize.ENUM("LOGIN", "FORGOT-PASSWORD"),
    },
    {
      paranoid: true,
    }
  );
  return Token;
};
