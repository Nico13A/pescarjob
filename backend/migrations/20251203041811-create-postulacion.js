'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postulacion', {
      idpostulacion: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idegresado: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'egresado',
          key: 'idegresado',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idoferta: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'oferta',
          key: 'idoferta',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fecha_postulacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('postulacion', {
      fields: ['idegresado', 'idoferta'],
      type: 'unique',
      name: 'unique_postulacion'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('postulacion');
  },
};
