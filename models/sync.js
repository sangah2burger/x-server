const { sequelize } = require("./index"); // connection을 참조하겠다!
const { Model } = require("sequelize");

const sync = () => {
    sequelize
    .sync({force: true, alter:true})
    .then(()=> console
    .log("데이터베이스 생성 완료"))
    .catch((error)=> {
        console.log(error);
    });
}

module.exports = sync;
