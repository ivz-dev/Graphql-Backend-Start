const config = require("config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: config.get("Database.mysql.host"),
  database: config.get("Database.mysql.name"),
  username: config.get("Database.mysql.user"),
  password: config.get("Database.mysql.password"),
  dialect: config.get("Database.mysql.dialect"),
  port: config.get("Database.mysql.port")
});

const User = sequelize.define(
  "user_details",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    gender: Sequelize.STRING,
    password: Sequelize.STRING,
    status: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

module.exports = {
  User
};
