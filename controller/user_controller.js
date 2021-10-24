const {emailcheck_model,create,getUserByEmail,call_2,persentage}=require("../model/user_service")

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const{nodemailer}=require("nodemailer");
const tk=require('crypto').randomBytes(64).toString('hex');

module.exports={
    emailcheck:(req,res)=>{//email is a unique constraint
        const body=req.body
        emailcheck_model(body,(err,results)=>{
            if(err){
                res.json({
                    error:"error",
                    message:"email already excists"
                })
            }
            if (results){
                res.json({
                    result:results
                })
            }
        })
    },
    createUser:(req,res)=>{
        const body=req.body;
        
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.json({
                    "succes":0,
                    "message":"error"
                });
            }
            return res.json({
                "succes":1,
                "data":results
            })    
        })
    },
    login:(req,res)=>{
        const body=req.body;
        getUserByEmail(body.email,(err,results)=>{
            if(err){
                return res.json({
                    "succes":0,
                    "message":"error"
                })
            }
            if (!results){
                return res.json({
                    "succes":0,
                    "message":"error"
                })
            }
            const result=compareSync(body.password,results.password)
            if (result){
                return res.json({
                    data:results
                })                          
            }
        })
    },
    
    tokengen:(req,res)=>{
        
        const user={id:3}
        const token=jwt.sign({ user },"user")
        res.json({
            token:token
        })
    },

    ensuretoken:(req,res,next)=>{
        const bearHeader=req.headers["authorization"]
        if (typeof bearHeader!="undefined"){
            const bearer=bearHeader.split(" ")
            const bearToken=bearer[1]
            req.token=bearToken
            next()
        }
        else{
            res.sendStatus(403)
        }
    },
    tokengen_student:(req,res)=>{
        
        const user={id:3}
        const token=jwt.sign({ user },"user")
        res.json({
            token:token
        })
    },

    ensuretoken_student:(req,res,next)=>{
        const bearHeader=req.headers["authorization"]
        if (typeof bearHeader!="undefined"){
            const bearer=bearHeader.split(" ")
            const bearToken=bearer[1]
            req.token=bearToken
            next()
        }
        else{
            res.sendStatus(403)
        }
    },
    call:(req,res)=>{
        const body=req.body
        call_2(body,(err,results)=>{
            if (err){
                res.json({
                    error:err
                })
            }
            else{
                res.json({
                    body:results
                })
            }
        })
    },
    tokengen_admin:(req,res)=>{
        
        const user={id:3}
        const token=jwt.sign({ user },"user")
        res.json({
            token:token
        })
    },

    ensuretoken_admin:(req,res,next)=>{
        const bearHeader=req.headers["authorization"]
        if (typeof bearHeader!="undefined"){
            const bearer=bearHeader.split(" ")
            const bearToken=bearer[1]
            req.token=bearToken
            next()
        }
        else{
            res.sendStatus(403)
        }
   },
   admin_view:(req,res)=>{
       const body=req.params.name
       persentage(body,(err,results=>{
           if (err){
               res.json({
                   error:err
               })
           }
           res.json({
               result:results
           })
       }))
   }



}
