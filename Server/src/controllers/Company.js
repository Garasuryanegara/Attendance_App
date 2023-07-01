const db = require("../models");

const companyController = {
  getAll: async (req, res) => {
    try {
      const company = await db.Company.findAll();
      console.log(company);
      return res.send(company);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = companyController;
