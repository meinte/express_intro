exports.setupRoutes=function(app){
    var homeRouter = require(GLOBAL.__approot+"/controllers/routers/homeRouter.js")
    ,userRouters = require(GLOBAL.__approot+"/controllers/routers/userRouters.js")  
    ,partialsRouter = require(GLOBAL.__approot+"/controllers/routers/partialsRouter.js");
    
    app.get('/', homeRouter.home);    
    app.get('/user/login', userRouters.login);
    app.post('/user/login', userRouters.handleLogin);    
    app.get('/user/add', userRouters.addUser);
    app.post('/user/add', userRouters.userAdded);
    
    app.post('/system/grabpartial',partialsRouter.grabPartial);
}

exports.setupRenderEngine=function(app){    
    var htmlEngine = require(GLOBAL.__approot+'/services/render/htmlengine.js')
    ,templateFolder =  GLOBAL.__approot + '/views/templates/'
    ,masterFolder=  GLOBAL.__approot + '/views/templates/master/';
    
    htmlEngine.setSharedFolder(masterFolder);
    htmlEngine.addMap('*',masterFolder+'global.html');
    
    app.engine('html', htmlEngine.renderFile);
    app.set('views',templateFolder);
}