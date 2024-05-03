const bcrypt = require('bcrypt');
const password = '1234';
const saltRound = 10;

// sync
let hashed = bcrypt.hashSync(password, saltRound);
console.log(`password: ${password}, hashed:${hashed}`);
// compareSync : password와 hash가 같은지 보는 작업
const result = bcrypt.compareSync(password, hashed);
console.log(`Password is Same : ${result}`);


// async
const asyncFunc = async () => {
    let hashed = await bcrypt.hash(password, saltRound);
    console.log(`password: ${password}, hashed:${hashed}`);
    // compareSync : password와 hash가 같은지 보는 작업
    const result = await bcrypt.compare(password, hashed);
    console.log(`Password is Same : ${result}`);
}

asyncFunc()