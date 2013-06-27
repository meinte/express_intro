exports.grabPartial=function(req, res){
	var htmlEngine = require(GLOBAL.__approot+"/render/htmlengine.js")
	var id=req.body.id;
	
	var result={
        success:false,                
        message:null
    };
	
	res.writeHead(200, { 'Content-Type': 'application/json' });  
	result.success = true;
	result.message = htmlEngine.getPartial(id);
	res.write(JSON.stringify(result));
	res.end();    

}