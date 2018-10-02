const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Mongo DB CODE */
const mongoose = require('./db.js');

var employeeController = require('./controllers/employeeController');
var usersRouter = require('./routes/user');

/* MYSQL CODE */
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection(
    {    
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeedb',
        multipleStatements: true
    });

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection successful');
    else
        console.log('Database Connection Failed \n Error '+ JSON.stringify(err,undefined,2));
});

var app = express();
app.use(bodyParser.json());
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));
// app.use(cors({origin:'http://127.0.0.1:4200'}));
app.listen(3000, ()=>console.log('Server started at port : 3000'));

app.use("/employees",employeeController);

/* MYSQL */

//get all employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query("Select *From employee",(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
            // console.log(rows);
        }
         else
            console.log(err);
    });
});

//get an employees
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query("Select *From employee where EmpID = ?",[req.params.id],(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
            // console.log(rows);
        }
         else
            console.log(err);
    });
});

//Delete an employee
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query("Delete From employee where EmpID = ?",[req.params.id],(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
            // console.log(rows);
        }
         else
            console.log(err);
    });
});

//insert an employee
app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID=?;SET @NAME=?;SET @EmpCode=?;SET @Salary=?;\
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
        {
            rows.forEach(element => {
                if(element.constructor == Array)
                {
                    res.send("Inserted Employee ID: "+element[0].EmpID);
                }

            });
            // console.log(emp);
        }
         else
            console.log(err);
    })
});

//update an employee
app.put('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID=?;SET @NAME=?;SET @EmpCode=?;SET @Salary=?;\
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
        {
            rows.forEach(element => {
                if(element.constructor == Array)
                {
                    res.send("Successfully Updated Employee ID: "+element[0].EmpID);
                }

            });
            // console.log(emp);
        }
         else
            console.log(err);
    })
});

//passport.js
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);


app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'secret',
    cookie:{
        maxAge:36000000,
        httpOnly:false,
        secure:false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })

}));

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use('/users',usersRouter);


  app.get('/api/me', 
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json(req.user);
});

//jwt using local strategy
const jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
var refreshTokens = {};
var SECRET = 'my-own-secret-key';
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/jwt/login',passport.authenticate('local', { session: false }),
    function(req, res) {
        // res.json(req.user);
        
        if(req.user.message)
            res.json(req.user)
        else if(req.user._id)
        {
            // res.json(req.user{)
            
            var username = req.user._id;
            var user = { 
                'username': username, 
                'role': 'admin' 
              } 
            var token = jwt.sign(user, SECRET, { expiresIn: '60s' }); 
            var refreshToken = randtoken.uid(256); 
            refreshTokens[refreshToken] =username;
            res.json({token: token, refreshToken: refreshToken}) 
            
            //  jwt.sign({user: req.user},'my-own-secret-key', {expiresIn: '30s'},(err,token)=>{
            //     res.json({
            //         token
            //     });
            // });
        }
        else
            res.json('Bad Request');
});

app.post('/api/test', verifyToken, (req, res)=>{

    jwt.verify(req.token, 'my-own-secret-key', (err, authData)=>{
        if(err)
        { 
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'test successful',
                authData
            });
        }
    })
});

//to refresh a token
app.post('/api/token', function (req, res, next) {
    var username = req.body.username
    var refreshToken = req.body.refreshToken

    // if((refreshToken in refreshTokens) &&
    // the above code will not run because the key is in the form of string 
    // See the answer no 3 on below link to understand
    // https://stackoverflow.com/questions/40683151/compare-a-string-to-a-key-in-a-javascript-object 
     
    if( (Object.keys(refreshTokens).indexOf(refreshToken)) && (refreshTokens[refreshToken] == username)) 
    {
      var user = {
        'username': username,
        'role': 'admin'
      }
      var token = jwt.sign(user, SECRET, { expiresIn: 300 });
      var refreshToken = randtoken.uid(256); 
      refreshTokens[refreshToken] =username;
      res.json({token: token, refreshToken: refreshToken})       
    }
    else {
      res.sendStatus(401)
    }
  })

//FORMAT OF TOKEN
// Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the spacenp
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else {
        //Forbidden
        res.sendStatus(403);
    }
}

//FORMAT OF TOKEN
// Authorization: JWT <access_token>
// Check screenshot of postman to understand: https://cloud.githubusercontent.com/assets/10692718/23335865/f2682d76-fb72-11e6-8802-3157da29c622.png

//use sesssion: false because we do not want sessions to be maintained for apis and not recommended approach
//use failureRedirect: '/error' if error is unauthorized.
app.get('/test_jwt', 
    passport.authenticate('jwt', { failureRedirect: '/error',session: false }), function (req, res) {
    if(req.user.message)
        res.json(req.user)
    else
        res.json({success: 'You are authenticated with JWT!', user: req.user})
  });


  app.get('/error', (req, res) => res.send({message: 'Token is expired'} ));