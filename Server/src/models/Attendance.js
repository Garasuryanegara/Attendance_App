module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define(
    "Attendances",
    {
      clockIn: Sequelize.STRING,
      clockOut: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return Attendance;
};
