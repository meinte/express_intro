var Step = require('step');
var fs = require('fs')
    ,templateCache = {}
    ,templateMasterMap={}
    ,sharedFolder = null;


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
   
    if(clientData)
        $('script#client_data').prepend("\n\t\tvar clientData = "+JSON.stringify(clientData)+";");
}

function replaceDivContents($,$M){
    var all_divs = $('div');
    all_divs.each(
        function(index,element){
            var elementID = element.attribs['id']
            if(elementID){
                var masterElement = $M('#'+elementID);
                if(masterElement) $(element).prepend(masterElement.html());
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
            parseHead($,$M,clientData);
            replaceDivContents($,$M);
        }
    );
    
    
    return $.html();
}

function renderData(template,masterPages,callback,clientData){   
    template = parseRaw(template,masterPages,clientData);
    if(callback)callback(null,template);
    else return template;
}

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