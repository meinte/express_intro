GLOBAL.__approot = __dirname;
var express = require("express")   
    ,path = require('path')
    ,app = express()
    ,homeRouter = require("./controllers/routers/homeRouter.js")
    ,userRouters = require("./controllers/routers/userRouters.js")
    ,htmlEngine = require('./render/htmlengine.js')
    ,templateFolder =  __dirname + '/views/templates/'
    ,masterFolder=  __dirname + '/views/templates/master/';
    

app.use(express.static(path.join(__dirname, '/views/resources')));
app.use(express.compress());
app.use(express.bodyParser());

htmlEngine.setSharedFolder(masterFolder);
htmlEngine.addMap('*',masterFolder+'global.html');

app.engine('html', htmlEngine.renderFile);


app.set('views',templateFolder);

app.get('/', homeRouter.home);

app.get('/user/login', userRouters.login);
app.post('/user/login', userRouters.handleLogin);

app.get('/user/add', userRouters.addUser);
app.post('/user/add', userRouters.userAdded);

app.listen(process.env.PORT,process.env.IP);






