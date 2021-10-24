const sql=require("../config/db")
const nodemailer=require("nodemailer")
const { body, validationResult } = require('express-validator');
const a=(body(body.email).isEmail())
const b=body(body.password).isLength({ min: 8 })
module.exports={    create:(data,callBack)=>{//email is a unique key
    sql.query(`insert into registeration(firstName, lastName, id, email, password, number) 
    values(?,?,?,?,?,?)`,
    [   data.first_name,
        data.last_name,
        data.id,
        data.email,
        data.password,
        data.number],(err,results)=>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results)
        })
},
    emailcheck_model:(data,callBack)=>{
        if (a){
            if (b){
                sql.query(`insert into admin(firstName, lastName, email, password, number) 
                values(?,?,?,?,?)`,[data.first_name,data.last_name,data.email,data.password,data.mobile_number],(err,results)=>{
                    if (err){
                        return callBack(err)
                    }

                    if (results){
                        return callBack(null,results)
                    }
                })
            }

        }
    },
    getUserByEmail:(email,callBack)=>{
        sql.query(`select * from registeration where email = ?`,
        [email],(err,results)=>{
            if (err){
                return callBack(err)

            }
            return callBack(null,results)
        }       
        )
    },
    call_2:(data,callBack)=>{
        sql.query(`insert into student (first_name,last_name,results,email,id,s_1,s_2,s_3,s_4,s_5,s_6) values(?,?,?,?,?)`,[data.first_name,data.last_name,data.result,data.email,data.id,data.s_1,data.s_2,data.s_3,data.s_4,data.s_5,data.s_6],(err,results)=>{
            if(err){
                return callBack(err)
            }

            return  callBack(null,results)
        })
    },
    persentage:(data,callBack)=>{
        sql.query('select * from where first_name=?',[data],(err,results)=>{
            if (err){
                return callBack(err)
            }
            return callBack(null,results)
        })
    }
    
}
