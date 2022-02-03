const { Sequelize } = require('sequelize');
const model = require('../database')

const user = model.define('user',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nome: {
    allowNull: false,
    type: Sequelize.STRING    
  },
  ativo: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  email:{
    allowNull: false,
    type: Sequelize.STRING
  },
  senha:{
    allowNull:false,
    type: Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
})

user.associate = (models)=>{

  user.hasMany(models.note,{
    as: 'note',
    foreingKey: 'iduser'
  })
  return user
}

module.exports = user