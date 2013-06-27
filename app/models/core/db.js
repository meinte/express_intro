// terminal: mongo dharma.mongohq.com:10020/mdb -u meinte -p axzs123

var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});

mongoose.connect('meinte:axzs123@dharma.mongohq.com:10020/mdb');



exports.conn = function(){
    return mongoose.connection;    
}

exports.mongoose=function(){    
    return mongoose;
}

exports.schema=function(){
    return mongoose.Schema;
}
