const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            }
        })
    }
}