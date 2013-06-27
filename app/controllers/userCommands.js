var User = require(GLOBAL.__approot+'/models/userModel.js');
exports.storeUser = function(userObject,callback){    
    var toAdd = new User(userObject);
    toAdd.save(callback);
}

exports.loginUser=function(email,password,callback){
    if(!email || !password) return callback(null,null);      
    
    User.findOne({ email:email}, function (err, user){
        if(err) return callback(null,err);       
        if(!user) return callback(null,null);
       
        var bcrypt = require('bcrypt');
        bcrypt.compare(password, user.password, function(err, res) {
            if(err) return callback(null,err);
            
            if(res){
                return callback(user,null)
            }                
            else{
                return callback(null,null);
            }
                
            
        });
    });
    
}