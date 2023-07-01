module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("Companies", {
    name: Sequelize.STRING,
    address: Sequelize.STRING,
  });
  return Company;
};
