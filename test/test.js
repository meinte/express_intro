describe('UserCommands', function(){
  describe('#storeUser()', function(){
  	var userCommands = require('../app/controllers/userCommands.js');
    it('login user without error', function(done){
      var userName='';
      user.save(function(err){
        if (err) throw err;
        done();
      });
    })
  })
})