'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      // Define association here
      Restaurant.belongsTo(models.User, {
        foreignKey: 'added_by'
      });
    }
  }
  Restaurant.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    image: DataTypes.STRING,
    added_by: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Restaurant',
  });

  return Restaurant;
};
