const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                userID : {
                    type: Sequelize.STRING(50),
                    allowNull : false,
                },
                content : {
                    type: Sequelize.TEXT,
                    allowNull : false,
                },
            },
            { // 테이블 설정이 객체로 전달
                sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'Post',
                tableName: 'post',
            }
        );
    }

    static associate(db) {
        db.Post.belongsTo(db.User, {
            foreignKey: "userID",
            sourceKey: "userID"
        });
    }
}

module.exports = Post;