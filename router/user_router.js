const sql=require("../config/db")
var router=require("express").Router();
const{
    tokengen,
    ensuretoken,
    emailcheck,
    tokengen_student,
    ensuretoken_student,
    call,
    tokengen_admin,
    ensuretoken_admin,
    admin_view
    
}=require("../controller/user_controller");
module.exports = router;
router.post('/protect',ensuretoken,(req,res)=>{
    //protect:(req,res)=>{
    jwt.verify(req.token,"user",(err,results)=>{
        if(err){
            res.sendStatus(403);
        }else{
        res.json({
            text:"this is protectes",
            data:results
        })}
    })
    
});
router.post('/login_2',tokengen)
router.post('/email',emailcheck)
router.post('student',tokengen_student)
router.post('/protect_student',ensuretoken_student,(req,res)=>{
    //protect:(req,res)=>{
    jwt.verify(req.token,"user",(err,results)=>{
        if(err){
            res.sendStatus(403);
        }else{
        res.json({
            text:"this is protected",
            data:results
        })}
        call:(req.token,(err,results)=>{
            if (err){
                res.json({
                    error:err
                })
            }

        })
    })
    
});
router.post('/protect_admin',ensuretoken_admin,(req,res)=>{
    //protect:(req,res)=>{
    jwt.verify(req.token,"user",(err,results)=>{
        if(err){
            res.sendStatus(403);
        }else{
        res.json({
            text:"this is protectes",
            data:results
        })}
        if(results){
            sql.query(`select * from students`,[],err,results=>{
                if(err){
                    res.json({
                        error:err
                    })
                }
                res.json({
                    result:results
                })
            })
        }
    })
    
});
router.post('/admin',tokengen_admin)
//router.post('/email',emailcheck)
router.get=('/:name',admin_view)
module.exports=router
