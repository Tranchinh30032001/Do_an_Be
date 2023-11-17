'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentHoiThao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  StudentHoiThao.init({
    mssv: DataTypes.STRING,
    hoithao_id: DataTypes.STRING,
    isJoin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'StudentHoiThao',
  });
  return StudentHoiThao;
};