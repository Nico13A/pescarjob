'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('egresado', {
      idegresado: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idusuario: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'idusuario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      curso: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      estado_laboral: {
        type: Sequelize.ENUM('buscando', 'trabajando', 'freelance'),
        defaultValue: 'buscando',
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
    await queryInterface.dropTable('egresado');
  },
};
