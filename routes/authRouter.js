const express = require('express');
const {User} = require('../models'); // ../models/index(= 기본값 생략 가능, DB를 반환)
const router = express.Router();

// password를 암호화해서 받아오기 위한 과정
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const createHash = async (password, saltRound) => {
    let hashed = await bcrypt.hash(password, saltRound);
    console.log(hashed);
    return hashed;
}

router.post('/sign-up', async (req, res)=> {
    const member = req.body;
    member.password = await createHash(member.password, 10); // 암호화된 password로 바꿔치기
    try {
        const result = await User.create(member);
        res.json({ success: true, memeber: result, message: "회원가입 성공"});
    } catch(err) {
        res.json({ success: false, member:[], message: err.message });
    }
});

router.post('/sign-in', async(req, res)=> {
    const { userID, password } = req.body;
    const options = {
        attributes: ['password'],
        where: { userID: userID } // DB의 컬럼, 
    }
    const result = await User.findOne(options);
    // password, result.password
    if(result) {
        const compared = await bcrypt.compare(password, result.password);
        if(compared) {
            const token = jwt.sign({ uid: userID, rol: 'admin' }, secret)
            res.json({ success: true,
            token: token,
            message: '로그인에 성공했습니다.',
        })
        } else { 
            res.json({ success: false, message: "비밀번호가 틀립니다." });
        }
    } else {
        res.json({ success: false, message: "존재하지 않는 아이디입니다." });
    }
});

module.exports = router;