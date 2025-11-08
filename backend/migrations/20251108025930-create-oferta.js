'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('oferta', {
      idoferta: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idempresa: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'empresa', 
          key: 'idempresa',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      titulo: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      modalidad: {
        type: Sequelize.ENUM('remoto', 'presencial', 'hibrido'),
        allowNull: false,
        defaultValue: 'remoto',
      },
      ubicacion: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      fecha_fin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM('Activa', 'Cerrada', 'Suspendida'),
        allowNull: false,
        defaultValue: 'Activa',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('oferta');
  },
};
