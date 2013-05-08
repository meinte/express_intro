var userCommands = require(GLOBAL.__approot+'/controllers/userCommands.js');

function getViewData(user){
    return {
        data : {userName:user.firstname}          
    };
}

exports.addUser=function(req, res){     
    
    res.render('users/adduser.html');
}

exports.userAdded=function(req, res){
    var userObject={       
        firstname:req.param('firstname'),
        lastname:req.param('lastname'),
        address:req.param('address'),
        email:req.param('email'),
        password:req.param('password')   
    }   
    userCommands.storeUser(userObject,
        function (err, user) {
          if (err){
              res.render('users/adduser_error.html');
          }
          else{
              res.locals(getViewData(user));
              res.render('users/adduser_success.html');
          }
        }
    );
}

exports.login = function(req,res){
    res.render('authentication/login.html');
}

exports.handleLogin = function(req,res){      
    var User = require(GLOBAL.__approot+'/models/userModel.js');
 
    var email = req.param('login_email');
    var password = req.param('login_password');
    User.loginIsValid(email,password);    
}