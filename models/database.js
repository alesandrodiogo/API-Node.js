const { append } = require('express/lib/response');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('apiteste', 'alesandro', '*********', {
    host: 'localhost',
    port: '3000',
    dialect: 'mysql' 
  });

  try {
     sequelize.authenticate();
    console.log('Conexao realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao realizar a conexao:', error);
  }
module.exports = sequelize;
  