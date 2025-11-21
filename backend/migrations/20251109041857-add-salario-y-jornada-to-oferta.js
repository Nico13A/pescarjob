'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar columna salario
    await queryInterface.addColumn('oferta', 'salario', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    // Agregar columna jornada
    await queryInterface.addColumn('oferta', 'jornada', {
      type: Sequelize.ENUM('Tiempo completo', 'Medio tiempo'),
      allowNull: false,
      defaultValue: 'Tiempo completo',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar columnas si se hace rollback
    await queryInterface.removeColumn('oferta', 'salario');
    await queryInterface.removeColumn('oferta', 'jornada');
  },
};

