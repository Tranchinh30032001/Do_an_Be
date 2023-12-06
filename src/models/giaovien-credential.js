'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CredentialGiaoVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  CredentialGiaoVien.init({
    msgv: DataTypes.STRING,
    password: DataTypes.STRING,
    privateKey: DataTypes.STRING,
    publicKey: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CredentialGiaoVien',
  });
  return CredentialGiaoVien;
};