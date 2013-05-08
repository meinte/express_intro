var User = require(GLOBAL.__approot+'/models/userModel.js');
exports.storeUser = function(userObject,callback){    
    var toAdd = new User(userObject);
    toAdd.save(callback);
}

exports.getUser=function(email,password,callback){
     User.findOne({ email:email}, function (err, doc){
       /*bcrypt.compare("B4c0/\/", hash, function(err, res) {
           
        });*/
    });
    
}