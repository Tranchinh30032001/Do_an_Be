'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChuyenNganh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  ChuyenNganh.init({
    nganh_id: DataTypes.STRING,
    ten_nganh: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ChuyenNganh',
  });
  return ChuyenNganh;
};