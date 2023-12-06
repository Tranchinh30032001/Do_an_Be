'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Lop, {foreignKey: "lop_id", as: "lopHocData"})

      Student.hasOne(models.Credential,  {foreignKey: "mssv", targetKey: "keyMaps", as: "mssvData"})

      Student.belongsTo(models.Role, {foreignKey: "role_id", as: "roleData"})

      // Student.belongsToMany(models.HoiThao, {through: models.StudentHoiThao})
    }
  }
  Student.init({
    mssv: DataTypes.STRING,
    ho_ten: DataTypes.STRING,
    lop_id: DataTypes.STRING,
    khoa_id: DataTypes.STRING,
    ngay_sinh: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    que_quan: DataTypes.STRING,
    gioi_tinh: DataTypes.STRING,
    tinh_trang: DataTypes.STRING,
    cccd: DataTypes.STRING,
    role_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};