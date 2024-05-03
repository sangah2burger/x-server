const express = require('express');
const {Post} = require('../models'); // ../models/index(= 기본값 생략 가능, DB를 반환)
const router = express.Router();

// password를 암호화해서 받아오기 위한 과정
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.post('/', async (req, res)=> {
    const newPost = req.body;
    newPost.userID = req.userID;
    try {
    const result = await Post.create(newPost)
    res.json({ success: true, documents: result, message: "포스트 등록 성공" })
    } catch (err) {
    res.json({ success: false, documents: [], message: "포스트 등록 실패" })
    }
});

router.get('/', async (req, res)=> {
    const result = await Post.findAll();
    res.json({ success: true, documents: result, message: "포스트 조회 성공"})
});

module.exports = router;