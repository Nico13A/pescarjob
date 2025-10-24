'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      idusuario: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usnombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      usapellido: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      usmail: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      uspass: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ustelefono: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      idrol: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'idrol',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  },
};
