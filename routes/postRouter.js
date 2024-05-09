const express = require('express');
const {Post} = require('../models'); // ../models/index(= 기본값 생략 가능, DB를 반환)
const router = express.Router();

// password를 암호화해서 받아오기 위한 과정
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


router.post('/', async (req, res)=> { // request안에 userID, rol이 들어있으므로 꺼내서 쓰면 됨
    const newPost = req.body;
    newPost.userID = req.userID;
    try {
    const result = await Post.create(newPost)
    res.json({ success: true, documents: [result], message: "포스트 등록 성공" });
    } catch (err) {
    res.json({ success: false, documents: [], message: "포스트 등록 실패" });
    }
});

router.get('/', async (req, res)=> {
    const result = await Post.findAll();
    res.json({ success: true, documents: result, message: "포스트 조회 성공"});
});

router.get('/:uid', async (req, res)=> {
    const userID = req.params.uid
    const options = {
        where : {
            userID : userID
        }
    };
    const result = await Post.findAll(options);
    res.json({ success: true, documents: result, message: '포스트 조회 성공'});
})

module.exports = router;