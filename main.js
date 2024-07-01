const express=require('express');
const dotenv=require('dotenv').config();
const db=require('./config/dbConnectionConfig');
const bodyParser = require('body-parser');
const session=require('express-session');
const app=express();
const PORT=process.env.PORT ;

//middlewares
app.use(
    session({
        secret : "my secret key",
        saveUninitialized : true,
        resave: false,
    })
);
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/",require('./routes/route'))
app.set('view engine','ejs');


db();

app.get('/test',(req,res)=>{
    res.send('Hello World');
});

app.listen(PORT,()=>{
    console.log('Server is running on port ...:'+PORT);
});