'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoiThao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HoiThao.belongsToMany(models.Student, {through: models.StudentHoiThao})
    }
  }
  HoiThao.init({
    hoithao_id: DataTypes.STRING,
    ten_hoithao: DataTypes.STRING,
    nguoi_chutri: DataTypes.STRING,
    des: DataTypes.STRING,
    ngay_batdau: DataTypes.DATE,
    ngay_ketthuc: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'HoiThao',
  });
  return HoiThao;
};