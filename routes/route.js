const express=require('express');
const Object=require('../models/model');
const router=express.Router();


router.get('/',async(req,res)=>{
    try {
        const cafes=await Object.find();
        res.render("home",{
            title:"Home Page",
            messages:"My cafe home",
            cafes:cafes
        });
        console.log('Cafes fetched successfully');
        
    } catch (error) {
        res.send('Failed to fetch cafes');
        console.log('Failed to fetch cafes');

    }
});

router.post("/add",async(req,res)=>{
    try {
        const cafe=new Object({
            name:req.body.name,
            phone:req.body.phone,
            reviewsum:0,
            reviewcount:0
        });
        await cafe.save();
        req.session.message={
            type:'success',
            message:'New Cafe Added successfully'
        }
        res.redirect('/');
        console.log('Cafe added successfully');
        
    } catch (error) {
        res.send('Failed to add cafe');
        console.log('Failed to add cafe');
    }
});

router.get('/add',(req,res)=>{
    res.render('add_cafe',{
        title:'Add Cafe'
        
    });
});
router.get("/rate/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id);
        const cafe=await Object.findById(id);
        res.render('rate_cafe',{
            title:'Rate Cafe',
            cafe:cafe
        });
    } catch (error) {
        console.log('Failed to rate cafe');
        console.log(error);
    }
});
router.post("/rate/:id",async(req,res)=>{
        const id=req.params.id;
        const rating=req.body.rating;
        try {
            
            const cafe=await Object.findById(id);
            const newsum=cafe.reviewsum+parseInt(rating);
            const newcount=cafe.reviewcount+1;
            await Object.findByIdAndUpdate(id,
                {
                    reviewsum:newsum,
                    reviewcount:newcount
                }
                );
            req.session.message={
                type:'success',
                message:'Cafe rated successfully'
            }
            
            res.redirect('/');
            console.log('Cafe rated successfully');
        } catch (error) {
            console.log('Failed to rate cafe');
        }
});



module.exports=router;