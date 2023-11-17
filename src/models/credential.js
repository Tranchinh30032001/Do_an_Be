'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Credential.belongsTo(models.Student, {foreignKey: "mssv", as: "mssvData"})
    }
  }
  Credential.init({
    mssv: DataTypes.STRING,
    password: DataTypes.STRING,
    privateKey: DataTypes.STRING,
    publicKey: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Credential',
  });
  return Credential;
};