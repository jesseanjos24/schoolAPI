'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
      nome: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await bcrypt.hash('johndoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Johna Doe',
      email: 'johnadoe@gmail.com',
      password_hash: await bcrypt.hash('johnadoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Davie Doe',
      email: 'daviedoe@gmail.com',
      password_hash: await bcrypt.hash('daviedoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'max Doe',
      email: 'maxdoe@gmail.com',
      password_hash: await bcrypt.hash('maxdoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Clarice Doe',
      email: 'claricedoe@gmail.com',
      password_hash: await bcrypt.hash('claricedoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Nikolas Doe',
      email: 'nikolasdoe@gmail.com',
      password_hash: await bcrypt.hash('nikolasdoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Marck Doe',
      email: 'marckdoe@gmail.com',
      password_hash: await bcrypt.hash('marckdoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Elise Doe',
      email: 'elisedoe@gmail.com',
      password_hash: await bcrypt.hash('elisedoe', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
