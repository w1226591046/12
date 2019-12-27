const express = require('express');
const bodyParser = require('body-parser');//post能够用req.body
const app = express();
const session = require('express-session');
const multer  = require('multer');
let sql = [
    {
        id:-1,
        name:'xx'
    },
    {
        id:0,
        name:'ff',
        type:0
    },
    {
        id:1,
        name:'ww',
        type:1
    },
    {
        id:2,
        name:'ee',
        type:9
    }
];
app.use(session({
    secret: '12期',
    name:'session_id',
    cookie: {maxAge: 5000},
    resave: false,
    saveUninitialized: true
}));
//传递一个包含静态资源的目录给express.static中间件用于立即开始提供文件。 比如用以下代码来提供public目录下的图片、css文件和js文件：
app.use(express.static('www'));  //[1,2,3]

app.use(multer({ dest: 'uploads/'}).single('filename'))
app.use('/',(req,res,next)=>{
    req.sql = sql;
    console.log('也能进')
    if(req.session.userinfo || req.url === '/login2'){
        next(); //上面的步骤完成，下面继续执行
    }else{
        // console.log('没有权限');
        res.json({code:100});
    }
});




app.use(bodyParser.json());//解决axios不能用对象的问题
app.use(bodyParser.urlencoded({extended:false}));


app.use('/login',require('./routers/user/login'));
//当碰到/login2的时候，引入login文件
app.use('/login2',require('./routers/user/login2'));
app.use('/getary',require('./routers/data/getary'));
app.use('/noloading',require('./routers/data/noloading'));
app.use('/upload',require('./routers/upload/upload'))


app.listen(80);