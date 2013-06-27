var Step = require('step')          //step is a lib for serial/parallel code execution. templatesloaded is executed once readTemplates is ready > https://github.com/creationix/step
    ,fs = require('fs')
    ,masterCache=[]
    ,templateCache = {}
    ,templateMasterMap={}
    ,sharedFolder = null;


//this depends on the masters already loaded
function getPartial(id){
	var partial =null;
	
	masterCache.forEach(
		function($M){
			var element = $M('#'+id);
			if(element){
				partial = element.html().toString();
			}		
		}
		
	);	
	return partial;
}

function setSharedFolder(folder){
    sharedFolder = folder;
}

function addMap(templateLocation,masterLocation){   
    if(!templateMasterMap[templateLocation]) templateMasterMap[templateLocation] =[];    
    templateMasterMap[templateLocation].push(masterLocation);
}

function parseHead($,$M,clientData){    
    if($M('head').length)
        $('head').prepend($M('head').html());  
   
    $('script#client_data').prepend("\n\t\tvar clientData = "+JSON.stringify(clientData)+";");
}

function replaceDivContents($,$M){
    var all_divs = $('div');
    all_divs.each(
        function(index,element){
            var elementID = element.attribs.id;
			if(elementID){
				var masterElement = $M('#'+elementID);                
                if(masterElement){
					if(masterElement[0].attribs['data-is_dynamic']!='true'){
						$(element).prepend(masterElement.html());
					}
						
                }
            }
        }
    );    
}

function parseRaw(rawData,masterPages,clientData){
    var cheerio = require('cheerio');
    var $ = cheerio.load(rawData.toString());
    masterPages.forEach(
        function(masterPage){            
            var $M = cheerio.load(masterPage.toString());
            masterCache.push($M);
            console.log(masterCache.length);
            parseHead($,$M,clientData);
            replaceDivContents($,$M);
        }
    );    
    return $.html();
}

function renderData(template,masterPages,callback,clientData){
    if(!clientData)clientData={};
    template = parseRaw(template,masterPages,clientData);
    if(callback)callback(null,template);
    else return template;
}

//TODO caching is not implemented. This whole thing is a stub anyway
function render(path, options, callback){ 
    var cachedTemplate = templateCache[path];
  
    if(!cachedTemplate){
        var globalMasters = (templateMasterMap['*'])?templateMasterMap['*']:[];
        var masters = (templateMasterMap[path])?templateMasterMap[path]:[];
        var templates = [path].concat(masters).concat(globalMasters);
       
        //step is a lib for serial/parallel code execution. templatesloaded is executed once readTemplates is ready > https://github.com/creationix/step
        Step(
            function readTemplates(){
                var group = this.group();
                templates.forEach(
                    function(templatePath){
						fs.readFile(templatePath, {encoding :'utf8',flag:'r'},group());            
                    }   
                );
            },
            function templatesLoaded(err,result){
                if(err){
                    if(callback)callback(err,null);
                    else throw new Error(err);
                }else{
                     var localTemplate = result.shift();
                     renderData(localTemplate,result,callback,options.data);
                }             
            }
           
       );
    }    
}

exports.renderFile = render;
exports.setSharedFolder = setSharedFolder;
exports.addMap = addMap;
exports.getPartial = getPartial;