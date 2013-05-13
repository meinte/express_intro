var RCK = (function(){    
    function init(e){       
        var func_Onready = gtag('html').attributes['data-onready'].value;
       
        if(window[func_Onready])
            window[func_Onready].apply(this,[clientData]);
    }
    
    function gtag(tag){
        return document.getElementsByTagName(tag)[0];
    }
     
    function gid(id){
        return document.getElementById(id);
    }
    
    function asyncRequest(url,callback){
        var oReq = new XMLHttpRequest();
        oReq.responseType = "json";
        oReq.addEventListener("progress", 
            function(evt){
                console.log(evt);
            }
        , false);
        
        oReq.addEventListener("load", 
            function(evt){
                console.log(evt);
            }        
        , false);
        oReq.addEventListener("error", 
            function(evt){
                console.log(evt);
            }   
        , false);
        oReq.addEventListener("abort", 
            function(evt){
                console.log(evt);
            }   
        , false);
        
        console.log('async',url,oReq);
        oReq.open("POST", url, true);
        oReq.send(null);
        
    }
     
    return{
        init:init,
        gid:gid,
        asyncRequest:asyncRequest,
        DOM_EVENTS:{
            CLICK:"click"
        }
    }
     
 })();
 
 
 window.addEventListener('load', RCK.init, false);
  //$(document).ready(RCK.init);
 
