var User = require(GLOBAL.__approot+'/models/userModel.js');
exports.storeUser = function(userObject,callback){    
    var toAdd = new User(userObject);
    toAdd.save(callback);
}

exports.loginUser=function(email,password,callback){
     User.findOne({ email:email}, function (err, user){
        if(err){
            callback(null,err);
            return;
        }
        if(!user){
            callback(null,null);
            return;
        }
        var bcrypt = require('bcrypt');
        bcrypt.compare(password, user.password, function(err, res) {
            if(err){
                callback(null,err);
                return;
            }
            if(res)callback(user,null)
            else callback(null,null);
            
        });
    });
    
}