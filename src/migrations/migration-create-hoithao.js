"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HoiThaos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hoithao_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ten_hoithao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nguoi_chutri: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      des: {
        type: Sequelize.STRING
      },
      ngay_batdau: {
        type: Sequelize.DATE
      },
      ngay_ketthuc: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable("HoiThaos");
  },
};
