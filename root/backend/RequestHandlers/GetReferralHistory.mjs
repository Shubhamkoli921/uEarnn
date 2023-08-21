// make a file GetReferralHistory in request handler folder at the backend

// url will be something like /api/get-referral-history?offset=0&limit=15

// take out offset and limit search parameters from the url

// get the _id of user from req['uid']

// perform database search on referralHistory with query being referrer_user_id = _id with skip value being offset and limit value being limit.

// and return the database response data in array form with following structure {success:true, data:[database response]

const express = require('express');
const router = express.Router();
const ReferralHistory =require('../models/ReferralHistory.mjs');
module.exports = router;

router.get('/api/get-referral-history',async (req,res)=>{
    try{
        const offset = parselInt(req.query.offset)||0;
        const limit = parselInt(req.query.offset)|| 15;

        const uid =req['uid'];

        const query ={referrer_user_id:uid};

        const data = await
        ReferralHistory.find(query).skip(offset).limit(limit);

        res.status(200).json({success:true,data});
    }catch(error){

        res.status(500).json({success:false,error:error.message});
    }


    });
