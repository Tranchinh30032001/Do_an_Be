'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mssv: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      ho_ten: {allowNull: false,
        allowNull: false,
        type: Sequelize.STRING
      },
      lop_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      khoa_id: {
        type: Sequelize.STRING
      },
      ngay_sinh: {
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.TEXT
      },
      que_quan: {
        type: Sequelize.STRING
      },
      gioi_tinh: {
        type: Sequelize.STRING
      },
      tinh_trang: {
        type: Sequelize.STRING
      },
      role_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cccd: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};