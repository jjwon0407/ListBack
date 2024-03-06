const express = require('express');
const Map = require('../models/map');
const axios = require('axios');
const router = express.Router();

const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

// 카카오 지도 정보 저장 API 요청
router.post('/', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        console.log('userId', userId);
        
        if (!req.body.userId) {
            console.log(req.body);
            console.log('userId is missing'); // 조건 확인 로그
            res.status(400).send('userId is missing');
            return;
        }
        // 데이터베이스에 지도 정보 저장
        const map = await Map.create({
            userId,
            name: req.body.name,
            address: req.body.address,
            lng: req.body.lng,
            lat: req.body.lat,
        });

        console.log('데이터가 저장되었습니다.');
        console.log(map);
        res.status(201).json(map);

        console.log('응답 확인:', map); 
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports=router;