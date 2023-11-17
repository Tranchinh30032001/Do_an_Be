"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lop_id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      ten_lop: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      so_sinh_vien: {type: Sequelize.INTEGER },
      so_sinh_vien_max: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      msgv: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      mssv: {
        type: Sequelize.STRING,
        defaultValue: null
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
    await queryInterface.dropTable("Lops");
  },
};
