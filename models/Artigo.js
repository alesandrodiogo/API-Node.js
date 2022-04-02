const Sequelize = require('sequelize');
const sequelize = require('./database');

const Livros = sequelize.define('livros', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    titulo: {
      type: Sequelize.STRING
    },
    descricao: {
      type: Sequelize.STRING
    }
  });

  //Livros.sync({force: true});
  module.exports = Livros;