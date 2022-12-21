<script>
	function validatedLogin(){
		try{
			alert('Successful!! Logged!!!');
		}catch(err){
			let login = document.getElementByClass("login").value;
			let pswd = document.getElementByClass("pswd").value;
			document.getElementByClassName("menssageError").innerHTML = err.message;
		
		}
	
		
	}
	
<script>
