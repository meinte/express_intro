"use strict";
 
 var DebugLevels={
    LVL_NONE:0,
    LVL_INFO:1<<1,
    LVL_NOTICE:1<<2,
    LVL_ERROR:1<<3
 };
 
 var Debug = (function(DEBUG_LEVEL){     
    function log(message,level){         
        if(!shouldLog(level)) return;
        var logFunc = console.log;
        switch(level){
            case DebugLevels.LVL_NOTICE:
                 logFunc=console.warn;
                break;
            case DebugLevels.LVL_ERROR:
                logFunc=console.error;
                break;
            default:
                logFunc=console.log;
                break;
        }     
       
        logFunc.apply(console,[message])
    }
    
    function shouldLog(level){
        return ((DEBUG_LEVEL | level)==DEBUG_LEVEL);
    }
    
    return{
        log:log,   
        
    };
})(DebugLevels.LVL_NOTICE | DebugLevels.LVL_ERROR);
    
var R = (function(){    
    function init(e){       
        var func_Onready = gtag('html').attributes['data-onready'].value;   
        var clientData = clientData || {};
        if(window[func_Onready])
            window[func_Onready].apply(this,[clientData,R]);
    }
    
    function gtag(tag){
        return document.getElementsByTagName(tag)[0];
    }
     
    function gid(id){
        return document.getElementById(id);
    }  
    
    function asyncRequest(url,data,callback){
        var oReq = new XMLHttpRequest();
       
        oReq.addEventListener("progress", 
            function(evt){
                Debug.log(evt,DebugLevels.LVL_INFO);
            }
        , false);
        
        oReq.addEventListener("load", 
            function(evt){
               Debug.log(evt,DebugLevels.LVL_INFO);
               var response = evt.currentTarget.responseText;
               if(response){
					try{
						console.log(response.message);
						callback(JSON.parse(response));
					}catch(e){
						Debug.log("Error with JSON response: "+response+", complete error:",DebugLevels.LVL_ERROR);
						Debug.log(e,DebugLevels.LVL_ERROR);
					}
               }
               
            }        
        , false);
        oReq.addEventListener("error", 
            function(evt){
                Debug.log(evt,DebugLevels.LVL_INFO);
            }   
        , false);
        oReq.addEventListener("abort", 
            function(evt){
                Debug.log(evt,DebugLevels.LVL_INFO);
            }   
        , false);   
        oReq.open("POST", url, true);
        oReq.setRequestHeader('Cache-Control','no-cache');
        oReq.setRequestHeader('Content-Type','application/json');        
        oReq.send(JSON.stringify(data));
        
    }
    
    function insertPartial(id,callback){
		var localElement = gid(id);
		if(!localElement) throw new Error("Page does not have element with ID: "+id);
		asyncRequest('/system/grabpartial',{id:id},
			function(result){
				if(result.success){
					var partial = result.message.replace(/\s+/g, ' ');				
					localElement.innerHTML=partial;
				}else{
					Debug.log("insertPartial:: result.success=false",DebugLevels.LVL_ERROR);
				}
			
			}
		);
    
    }
     
    return{
        init:init,
        insertPartial:insertPartial,
        gid:gid,
        asyncRequest:asyncRequest,
        DOM_EVENTS:{
            CLICK:"click"
        }
    }
     
 })();
 
 
 window.addEventListener('load', R.init, false);
  //$(document).ready(RCK.init);
 
