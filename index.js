
var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(express.json())
var router=require("./router/user_router");
app.use('/user',router);
app.get('/',(req,res)=>{
    res.send("suriya")
})
app.listen(2000,()=>{
    console.log('server is listeing');
  })