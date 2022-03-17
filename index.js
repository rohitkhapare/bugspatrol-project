const express= require("express")
const app= express();
const cors=require("cors")
app.use(express.json())
app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(cors({
      origin:"*"
  }))
console.log( "hello Rohit!!!")
require("dotenv").config()
const mysql= require("mysql2") 
const connection =mysql.createConnection({
    host: "localhost",
    user: process.env.db_username,
    password:process.env.db_password,
    database:process.env.db_name,
})
connection.connect(function(err){
    if(err){
        console.log(err)
        return
    }
    console.log("db connected")
})

app.post("/register",function(req,res){
    console.log(req.body)
    const {Username,password,Email,phonenumber}=req.body;
    var sql = "INSERT INTO user (username,password,email,phone) VALUES (?, ?, ?,?)";
    var values = [Username, password, Email, phonenumber];
    connection.query(sql,values, function(err, results, fields) {
        if(err){
            console.log(err)
            return
        }
        res.send("user registered sucessfully")
      });
})


// app.post("/appointment",function(req,res){
    // console.log(req.body)
    // const {address,date,time}=req.body;
    // var sql = "INSERT INTO appointment (uId,address,date,time) VALUES (?, ?, ?,?)";
    // var values = [11,address,date,time];
    // console.log("appointment")
    // connection.query(sql,values, function(err, results, fields) {
    //     if(err){
    //         console.log(err)
    //         return
    //     }
    //     res.send("appointment booked sucessfully")
    //     return res.json({
    //         results
    //     })
    //   });
// })
app.post("/appointment",function(req,res){
    console.log(req.body)
    const {name,email,address,date,phonenumber,time,services,payment}=req.body;
    var sql = "INSERT INTO appointment (Name,email,phonenumber,address,date,time,services,payment) VALUES (?, ?, ?,?,?,?,?,?)";
    var values = [name,email,phonenumber,address,date,time,services,payment]
    
    connection.query(sql,values, function(err, results, fields) {
        if(err){
            console.log(err)
            return
        }
        res.json({
            msg: 'appointment booked successfully'
        });
        res.end();
        // return res.json({
        //     results
        // })
      });
}) 

app.post("/largeappointment",function(req,res){
    console.log(req.body)
    const {Companyname,email,address,phonenumber,date,time,services,payment}=req.body;
    var sql = "INSERT INTO largeappointment (Companyname,email,phone,Address,date,time,services,payment) VALUES (?, ?, ?,?,?,?,?,?)";
    var values = [Companyname,email,phonenumber,address,date,time,services,payment];
    
    connection.query(sql,values, function(err, results ) {
        if(err){
            console.log(err)
            return
        }
        res.send("appointment booked sucessfully")
        // return res.json({
        //     results
        // })
      });
}) 

app.get("/",function(req,res){
    console.log(req.body)
})


app.get("/",function(req,res){
    console.log(req.body)
})

app.post("/login",function(req,res){
    console.log(req.body)
    const {Username,password}=req.body; 
    const sql =`select * from user where username=? and password=?`;
 

    
    var values = [Username, password];
    connection.query(sql,values, function(err, results, fields) {
        if(err){
            console.log(err)
            return
        }
        console.log(results)
      if(results.length<=0) {
        
         res.status(400)
         res.end("alert('LOGIN SUCCESSFULL');window.location.href='/home.html';")
          res.end(JSON.stringify({
              message:"Invalid username or password"
          }))
         
          return
      }

      res.end(JSON.stringify({
        message:"Login successful"
    }))
    return
      });
})


app.listen(3001,function(err){
        if(err){
            console.log(err)
            return
        }
    console.log("server live")
})

    