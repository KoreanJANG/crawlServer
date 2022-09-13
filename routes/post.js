const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Post, Hashtag, Comment, User, Trend, Like, Trendcomment, Question } = require('../models');
const { isLoggedIn } = require('./middlewares');
const {spawn} = require("child_process");

const router = express.Router();



router.post('/crawling', async (req, res) => {
  // post 파라미터로 크롤링할 url 주소를 받는다.
  const url = req.body.url;
  // 세션에서 사용자 아이디를 가져온다.
  const loginUserId = req.body.loginUserId;
  // 파이썬을 실행할 자식 프로세스를 생성한다.
  const spawn = require('child_process').spawn;
  // python3을 통해 crawling.py 파이썬 스크립트를 실행한다.
  // 스크립트 파라미터로 url과 userid를 넣어준다.
  const pythonProcess = spawn('python', ['crawling.py', url, loginUserId]);

  // 스크립트 실행 결과가 나오면 콘솔로 찍고 메인으로 리다이렉트 시킨다.
  pythonProcess.stdout.on('data', function(data) {
    console.log(data.toString());
    res.sendStatus(200);
  });
});



module.exports = router;
