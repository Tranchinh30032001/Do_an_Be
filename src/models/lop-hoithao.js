'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LopHoiThao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  LopHoiThao.init({
    lop_id: DataTypes.STRING,
    hoithao_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LopHoiThao',
  });
  return LopHoiThao;
};