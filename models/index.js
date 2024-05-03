const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require('./user'); // module.exports = db 할 때 참조값을 넘겨주는 작업
const Post = require('./post'); // module.exports = db 할 때 참조값을 넘겨주는 작업

db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);

User.associate(db);
Post.associate(db);

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;
