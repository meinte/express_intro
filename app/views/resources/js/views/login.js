function login_init(clientData,R){    
	var submit_btn = R.gid('login_submit');
	var login_email = R.gid('login_email');
	var login_password = R.gid('login_password');
	var error_label = R.gid('login_error');
    
    function init(){
		submit_btn.addEventListener(R.DOM_EVENTS.CLICK,submit_btnClickHandler);
    }
    
    function submit_btnClickHandler(e){       
		R.asyncRequest('/user/login',{email:login_email.value,password:login_password.value},
            function(result){
                if(result.success){
                    R.insertPartial('logged_in_box');
                }else{
                    setErrorMessage(result.message);
                }
            }        
        )
    }
    
    function setErrorMessage(value){
		error_label.innerHTML='';
		error_label.appendChild(document.createTextNode(value));
    }
    
    init();
    
}
