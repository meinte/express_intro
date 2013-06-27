GLOBAL.__approot = __dirname;
var express = require("express")   
    ,startupCommands = require(GLOBAL.__approot+'/controllers/startupCommands.js')
    ,path = require('path')   
    ,app = express();
   

//process.env['VARIABLE'] = 'value';
    
app.use(express.cookieParser());

//session store defaults to memorystory
app.use(express.session({secret: 'expr_sess_secret', key: 'express.sid', cookie: { secure: false }}));
app.use(express.static(path.join(__dirname, '/views/resources')));

app.use(express.compress());
app.use(express.bodyParser());
app.use(app.router);

startupCommands.setupRoutes(app);
startupCommands.setupRenderEngine(app);

app.listen(process.env.PORT,process.env.IP);