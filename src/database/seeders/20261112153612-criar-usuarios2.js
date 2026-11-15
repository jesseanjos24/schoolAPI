'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.bulkInsert('users', [
    {
      nome: 'Alejandro Morgan',
      email: 'alejandromorgan@gmail.com',
      password_hash: await bcrypt.hash('alejandromorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Lucas Morgan',
      email: 'Lucasmorgan@gmail.com',
      password_hash: await bcrypt.hash('Lucasmorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Isabel Morgan',
      email: 'Isabelmorgan@gmail.com',
      password_hash: await bcrypt.hash('Isabelmorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Martina Morgan',
      email: 'Martinamorgan@gmail.com',
      password_hash: await bcrypt.hash('Martinamorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Juan Morgan',
      email: 'Juanmorgan@gmail.com',
      password_hash: await bcrypt.hash('Juanmorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Santiago Morgan',
      email: 'Santiagomorgan@gmail.com',
      password_hash: await bcrypt.hash('Santiagomorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Olivia Morgan',
      email: 'Oliviamorgan@gmail.com',
      password_hash: await bcrypt.hash('Oliviamorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Lola Morgan',
      email: 'Lolamorgan@gmail.com',
      password_hash: await bcrypt.hash('Lolamorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Marisa Morgan',
      email: 'Marisamorgan@gmail.com',
      password_hash: await bcrypt.hash('Marisamorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Enzo Morgan',
      email: 'Enzomorgan@gmail.com',
      password_hash: await bcrypt.hash('Enzomorgan', 8),
      created_at: new Date(),
      updated_at: new Date()
    },
  ], {});
  },

  async down (queryInterface) {
   await queryInterface.bulkDelete('users', null, {});
  }
};

// npx sequelize db:seed --seed 20261112153612-criar-usuarios2
