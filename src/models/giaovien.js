'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiaoVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GiaoVien.hasOne(models.Lop, {foreignKey: "lop_id"})
    }
  }
  GiaoVien.init({
    msgv: DataTypes.STRING,
    ho_ten: DataTypes.STRING,
    ngay_sinh: DataTypes.DATE,
    gioi_tinh: DataTypes.INTEGER,
    que_quan: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    khoa_id: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GiaoVien',
  });
  return GiaoVien;
};