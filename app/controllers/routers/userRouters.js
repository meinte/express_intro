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
	res.locals(
		{
			data:"test"
		}	
	)
    res.render('users/login.html');
}

exports.handleLogin = function(req,res){    
    var email = req.body.email;
    var password = req.body.password;
    
    userCommands.loginUser( email,password,
        function(user,error){           
            res.writeHead(200, { 'Content-Type': 'application/json' });     
            var result={
                success:false,                
                message:null
            };
            if(user){
                req.session.userId   = user.id;                
                result.success=true;
            }               
            else{
                result.message="Username or password is invalid"; //localize
            }
                
            res.write(JSON.stringify(result));
            res.end();          
        }
        
    );  
   
}