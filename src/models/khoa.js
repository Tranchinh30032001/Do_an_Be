'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Khoa.hasMany(models.ChuyenNganh, {foreignKey: "nganh_id", as: "nganhData"})
    }
  }
  Khoa.init({
    khoa_id: DataTypes.STRING,
    ten_khoa: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Khoa',
  });
  return Khoa;
};