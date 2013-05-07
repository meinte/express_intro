exports.storeUser = function(userObject,callback){
    var User = require(GLOBAL.__approot+'/models/userModel.js');
    var toAdd = new User(userObject);
    toAdd.save(callback);
}

exports.validateLogin=function(email,password){
    
}