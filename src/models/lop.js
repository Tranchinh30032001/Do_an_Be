'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lop.hasMany(models.Student, {foreignKey: "mssv", as: "mssvData"})
      Lop.belongsTo(models.GiaoVien, {foreignKey: "lop_id", as: "lopHocData"})
    }
  }
  Lop.init({
    lop_id:DataTypes.STRING,
    ten_lop: DataTypes.STRING,
    so_sinh_vien: DataTypes.INTEGER,
    so_sinh_vien_max: DataTypes.INTEGER,
    msgv: DataTypes.STRING,
    mssv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lop',
  });
  return Lop;
};