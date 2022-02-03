
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('note', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING    
      },
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      tipo:{
        allowNull:false,
        type: Sequelize.STRING
      },
      nota:{
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "vazio"
      },
      idser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'user',
        key: 'id'
      }},
      nomeUser:{
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "vazio"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('note');
  }
};