const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                userID : {
                    type: Sequelize.STRING(50),
                    allowNull : false,
                    unique : true
                },
                userName : {
                    type: Sequelize.STRING(50),
                    allowNull : false,
                },
                password : {
                    type: Sequelize.STRING(200),
                    allowNull : false,
                }
            },
            { // 테이블 설정이 객체로 전달
                sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'User',
                tableName: 'user',
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post, {
            foreignKey : 'userID', // post의 id
            sourceKey : 'userID'// user의 id
        });
    }
}

module.exports = User;