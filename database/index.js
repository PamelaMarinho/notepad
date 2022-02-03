const Sequelize = require('sequelize')
//const db = require('../config/config.json')

const connection = new Sequelize('notacao','root','205778',{
    host:'localhost',
    dialect:'mysql',
    define:{
        freezeTableName: true
    }
})

module.exports = connection