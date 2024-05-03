const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '21YE(7!@3CQ';
const token = jwt.sign({
    id: 'userID',
    rol : true,
    },
    secret,
    { expiresIn : 60*60*24*3 }
);
console.log(token);

jwt.verify(token, secret, (error, decoded) => {
    console.log(decoded);
});