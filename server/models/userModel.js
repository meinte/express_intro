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
var User = mongoose.model('User', user_schema);
module.exports = User;