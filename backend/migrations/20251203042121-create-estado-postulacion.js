'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estado_postulacion', {
      idestado: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idpostulacion: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'postulacion',
          key: 'idpostulacion',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      estado: {
        type: Sequelize.ENUM(
          'Enviada',
          'En revisión',
          'Preseleccionado',
          'Contratado',
          'Rechazada',
          'Cancelada'
        ),
        allowNull: false,
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      fecha_fin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('estado_postulacion', ['idpostulacion'], {
      name: 'idx_idpostulacion'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('estado_postulacion');
  },
};

