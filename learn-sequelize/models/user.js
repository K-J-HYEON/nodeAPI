const Sequelize = require('sequelize');
const { SequelizeMethod } = require('sequelize/dist/lib/utils');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER,UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN, // true false
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE, // DATETIME, MYSQL DATE -> Sequelize DateOnly
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            // createAt, updateAt, deletedAt: true // soft delete
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
    } 
}