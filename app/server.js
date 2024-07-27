require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const {Blob} = require("buffer")
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

console.log(process.env.ACCESS_TOKEN_SECERT)

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const dp = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: "3307",
    password: '12345678',
    database: 'blog'
    })

dp.connect(err=>{
    if(err){
        console.log("dp not connected")
    }
    else{
        console.log("dp connected");
    }
})

app.get("/",(req,res)=>{
    dp.query("select * from bloglist", (err,result)=>{
        //console.log(result)
        if(err){
            console.log(err);
            console.log("error in getting data")
        }
        else{
            // result.map((items=>(items.img== new Blob([Buffer.from(items.img, 'base64')], { type: 'image/png' }))))
            // console.log(new Blob([Buffer.from(result[0].img, 'base64')], { type: 'image/png' }))
            for(let i=0; i<result.length; i++){
                result[i].img = new Blob([Buffer.from(result[i].img, 'base64')], { type: 'image/png' })
            }
            console.log(result[0].img)
            res.json(result)
            
        }
    })
    
})

app.get("/comment",(req,res)=>{

    dp.query(`insert into comment(firstname,secondname,email,comments) values("${req.query.firstnames}","${req.query.lastnames}","${req.query.emails}","${req.query.comments}")`,(err)=>{
        if(err){
            console.log(err);
            console.log("error in getting data")
        }else{
            // console.log("done");
            // res.json({"message":"done"})
            res.status(201).send("comment added");
            
        }  
    })
})


app.post("/createacc", async(req,res)=>{
    
    try{
        const {username,password,confirmpassword,email} = req.body;
        if(password !== confirmpassword){
            return res.status(400).send("passwords are not matching")
        }
        let exist = await dp.query('SELECT email FROM usedata WHERE email = ?', [email],async(err,result)=>{
            // console.log(result.length)
            if(result.length > 0){
                return res.status(400).send("user already Exist")
            }else{
                const salt =  await bcrypt.genSalt();
                const hashPassword =  await bcrypt.hash(password,salt)
                //console.log(salt)
                //console.log(hashPassword);
                dp.query(`insert into usedata(username,email,password) values("${username}","${email}","${hashPassword}")`);
                const user = {username:username};
                console.log(process.env.ACCESS_TOKEN_SECERT)
                const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECERT)
                return res.status(200).json({message: "user added",acessToken: accessToken})
            }
        })}
        catch(err){
            console.error(err);
            return res.status(500).send("Internal server error");
        }
    })

    app.post("/login", async(req,res)=>{
        try{
            const {username,password} = req.body;
            //console.log(username)
            const log = await dp.query('select username from usedata where username = ?',[username], async(err,result) =>{
                //console.log(result);
                if(result.length <1){
                    return res.status(400).send("invaild user name")
                }
                //console.log(result);
                const log2 =await dp.query(`select password from usedata where username = ?`,[username],async(err,result)=>{
                    console.log(password)
                    console.log(await bcrypt.compare(password,result[0].password))
                    if(await bcrypt.compare(password, result[0].password)){
                        return res.status(200).send("login succesfull")
                    }else{
                        return res.status(400).send("invaild password");
                    }
                })
            })
        }catch{
            res.status(500).send("internal erorr");
        }
    })


app.listen(4000,()=>{console.log("server is running at 4000")})