const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
// Change your SSL Options as required. These are defaults for PlanetScale.
const dbConnOpts = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
};

const dbURI = `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const sequelize = new Sequelize(dbURI, {});

// Declare a Order Model
const Order = sequelize.define("Order", {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Database sync error:", error);
  });

module.exports = {
  Order: Order,
};
