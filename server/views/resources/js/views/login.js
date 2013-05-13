function login_init(clientData){    
    var submit_btn = RCK.gid('login_submit');
    
    function init(){
        submit_btn.addEventListener(RCK.DOM_EVENTS.CLICK,submit_btnClickHandler);
    }
    
    function submit_btnClickHandler(e){       
        RCK.asyncRequest('/user/login',
            function(result,error){
                
            }        
        )
    }
    
    init();
    
}
