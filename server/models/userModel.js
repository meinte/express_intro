var db=require('./core/db.js');
var Schema   = db.schema();
var mongoose = db.mongoose();

var user_schema = new Schema(
    {
        email:{type:String,required:true,index: { unique: true }},
        password:{type:String,required:true},
        firstname:String,        
        lastname:String,
        address:String,
        birthdate:Date,
        created_date:{type:Date,default:Date.now()},
        deleted_date:Date,
        is_delete:Boolean
    }
);


user_schema.statics.findByEmail=function(email,callback){    
    User.findOne({ email:email}, function (err, doc){
      // doc is a Document
        if(err)return null;
        console.log("1");
    });
  
}

user_schema.statics.loginIsValid = function(email,password){  
    var user = User.findByEmail(email,
        function(user){
            if(!user)return false;
        }
    
    
    );
    
    
    /*bcrypt.compare("B4c0/\/", hash, function(err, res) {
       
    });*/
    return false;
}

var User = mongoose.model('User', user_schema);

user_schema.pre('save',
    function(next){
        //encrypt password using bcrypt
        var bcrypt = require('bcrypt');
        var parent_context = this;
        bcrypt.genSalt(10, 
            function(err, salt) {
                if(err)throw new Error(err);
                bcrypt.hash(parent_context.password, salt, 
                    function(err, hash) {
                        if(err)throw new Error(err);
                        parent_context.password = hash;                        
                        next();
                    }
                );
            }
        );        
    }    
);

module.exports = User;