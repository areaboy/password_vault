
// User Login

$(document).ready(function(){
$('#login_btn').click(function(){
//$(document).on( 'click', '.login_btn', function(){ 
		
var password  = $('#password1').val();
var email  = $('#email1').val();

if(email==""){
alert('Please Enter Email Address');
//return false;   
}

else if(password==""){
alert('Please Enter Password');
//return false;   
}

else{
$('#loader_login').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;"><img src="ajax-loader.gif"> Please Wait! .Processing Login Data...</div>')

var datasend = {password:password, email:email};	
		$.ajax({
			
			type:'POST',
			url:'http://localhost/password_vault/authn_login_user.php',
			data:datasend,
dataType: 'json',
                        crossDomain: true,
			cache:false,
			success:function(msg){
 		
$('#loader_login').hide();
//$('#result_login').html(msg);
//setTimeout(function(){ $('#result_login').html(''); }, 9000);


if(msg.status == 0){
var messagex = msg.message;
alert(messagex);


$('#result_login').html("<div style='color:white;background:red;padding:8px;border:none;'>" +messagex+ "</div>");
setTimeout(function(){ $('#result_login').html(''); }, 5000);


}



if(msg.status == 1){

var messagex = msg.message;
alert(messagex);


$('#result_login').html("<div style='color:white;background:green;padding:8px;border:none;'>" +messagex+ "</div>");
setTimeout(function(){ $('#result_login').html(''); }, 5000);



$('#password1').val('');
$('#email1').val('');

// initialize sessions

sessionStorage.setItem('access_userid', msg.userid);
sessionStorage.setItem('access_usertoken', msg.token);
sessionStorage.setItem('access_fullname', msg.fullname);
sessionStorage.setItem('access_email', msg.email);

window.location='dashboard.html';
/*
window.setTimeout(function() {
    window.location.href = 'dashboard.html';
}, 1000);
*/

}








			}
			
		});
		
		}
	
	})
					
});





// Create User

$(document).ready(function(){
$('#signup_btn').click(function(){
//$(document).on( 'click', '.signup_btn', function(){ 
		
var password  =         $('#password').val();
var email  =            $('#email').val();
var password_confirm =  $('#password_confirm').val();
var fullname  =         $('#fullname').val();


if(/[a-z]+/.test(password) && /[A-Z]+/.test(password) && /\d+/.test(password) && password.length >= 8){
  //return true;
//alert('ok');
}
else{

alert("Your password needs Upper and lower case letters, numbers and a minimum 8 characters");
return false;
}


var special_character = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

if(special_character.test(password)){
 // return true;
} else {


alert("Your password must contain atleast One Special Character Eg. !@#$%&* ");
  return false;
}





if(email==""){
alert('Please Enter Email Address');
//return false;   
}

else if(password==""){
alert('Please Enter Password');
//return false;   
}

else if(password_confirm==""){
alert('Please Confirm Password');
//return false;
}


else if(password != password_confirm){
alert('Password Does not Match');
//return false;
}

else if(fullname==""){
alert('Please Enter Fullname');
//return false;
}


else{
$('#loader_signup').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;"><img src="ajax-loader.gif"> Please Wait! .Users is being Created...</div>')



var datasend = {password:password, email:email, password_confirm:password_confirm, fullname:fullname};	
		$.ajax({
			
			type:'POST',
			url:'http://localhost/password_vault/authn_create_user.php',
			data:datasend,
                        crossDomain: true,
			cache:false,
			success:function(msg){
 		
$('#loader_signup').hide();
$('#result_signup').html(msg);
//setTimeout(function(){ $('#result_signup').html(''); }, 9000);


//strip all html elemnts using jquery
var html_stripped = jQuery(msg).text();
//check occurrence of word (successful) from backend output already html stripped.
var Frombackend = html_stripped;
var bcount = (Frombackend.match(/successful/g) || []).length;
if(bcount > 0){
$('#password').val('');
$('#password_confirm').val('');
$('#email').val('');
$('#fullname').val('');

}
			}
			
		});
		
		}
	
	})
					
});










// Reset Password


$(document).ready(function(){
$('#reset_password_btn').click(function(){
//$(document).on( 'click', '.reset_password_btn', function(){ 
		
var password  =         $('#passwordx').val();
var email  =            $('#emailx').val();
var password_confirm =  $('#password_confirmx').val();


if(/[a-z]+/.test(password) && /[A-Z]+/.test(password) && /\d+/.test(password) && password.length >= 8){
  //return true;
//alert('ok');
}
else{

alert("Your password needs Upper and lower case letters, numbers and a minimum 8 characters");
return false;
}


var special_character = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

if(special_character.test(password)){
 // return true;
} else {


alert("Your password must contain atleast One Special Character Eg. !@#$%&* ");
  return false;
}




if(email==""){
alert('Please Enter Email Address');
//return false;   
}

else if(password==""){
alert('Please Enter Password');
//return false;   
}

else if(password_confirm==""){
alert('Please Confirm Password');
//return false;
}


else if(password != password_confirm){
alert('Password Does not Match');
//return false;
}



else{
$('#loader_reset_password').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;"><img src="ajax-loader.gif"> Please Wait! .Your Password is being Reset...</div>')



var datasend = {password:password, email:email};	
		$.ajax({
			
			type:'POST',
			url:'http://localhost/password_vault/authn_password_reset.php',
			data:datasend,
                        crossDomain: true,
			cache:false,
			success:function(msg){
 		
$('#loader_reset_password').hide();
$('#result_reset_password').html(msg);
//setTimeout(function(){ $('#result_reset_password').html(''); }, 9000);


//strip all html elemnts using jquery
var html_stripped = jQuery(msg).text();
//check occurrence of word (successful) from backend output already html stripped.
var Frombackend = html_stripped;
var bcount = (Frombackend.match(/successful/g) || []).length;
if(bcount > 0){
$('#passwordx').val('');
$('#password_confirmx').val('');
$('#emailx').val('');

}
			}
			
		});
		
		}
	
	})
					
});
















// Create  Password Secret Vaults


$(document).ready(function(){
$('#v_btn').click(function(){
//$(document).on( 'click', '.v_btn', function(){ 
		
var password  =         $('#passwordb').val();
var email  =            $('#emailb').val();
var title =  $('#title').val();
var color =  $('#color').val();

//var fullname = $('.fullname_value').val();
 var fullname = sessionStorage.getItem("access_fullname");


//alert(fullname);

if(email==""){
alert('Please Enter Login Email/Username');
//return false;   
}

else if(password==""){
alert('Please Enter Password or Secret');
//return false;   
}

else if(title==""){
alert('Please Enter Password Title');
//return false;
}


else if(color==''){
alert('Please Select Color');
//return false;
}



else{
$('#loader_v').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;"><img src="ajax-loader.gif"> Please Wait! .Your Password Secret Vault is being Created...</div>')



var datasend = {password:password, email:email, title:title, color:color, fullname:fullname};	
		$.ajax({
			
			type:'POST',
			url:'http://localhost/password_vault/vault_password_store.php',
			data:datasend,
dataType: 'json',
                        crossDomain: true,
			cache:false,
			success:function(msg){
 		
$('#loader_v').hide();
$('#result_v').html(msg);
//setTimeout(function(){ $('#result_v').html(''); }, 9000);


if(msg.status == 0){

alert(msg.message);


$('#result_v').html("<div style='color:white;background:red;padding:8px;border:none;'>" +msg.message+ "</div>");
setTimeout(function(){ $('#result_login').html(''); }, 5000);

}

if(msg.status == 1){

alert(msg.message);

$('#result_v').html("<div style='color:white;background:green;padding:8px;border:none;'>" +msg.message+ "</div>");
setTimeout(function(){ $('#result_login').html(''); }, 5000);

$('#passwordb').val('');
$('#title').val('');
$('#emailb').val('');
$('#color').val('');

location.reload();

}
		

	}
			
		});
		
		}
	
	})
					
});









// Load Password Vault Data

$(document).ready(function(){

var vault =  'secret';

if(vault==""){
alert('Please set vault to secret'); 
}


else{
$('#loader_vault').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;"><img src="ajax-loader.gif"> Please Wait! .Password Vaults is being loaded...</div>')



var datasend = {vault:vault};	
		$.ajax({
			
			type:'POST',
			url:'http://localhost/password_vault/vault_password_load.php',
			data:datasend,
                        crossDomain: true,
			cache:false,
			success:function(msg){
 		
$('#loader_vault').hide();
$('#result_vault').html(msg);
//setTimeout(function(){ $('#result_vault').html(''); }, 9000);


			}
			
		});
		
		}

					
});







// Delete Vaults Data

$(document).ready(function(){
//$('.delete_btn').click(function(){
$(document).on( 'click', '.delete_btn', function(){ 

var id = $(this).data('id');
//alert(id);

// confirm start
 if(confirm("Are you sure you want to Delete this Data: ")){

$(".loader-delete_"+id).fadeIn(400).html('<br><div style="color:black;background:white;padding:10px;"><img src="ajax-loader.gif"> &nbsp;Please Wait, Vault Data is being deleted...</div>');
var datasend = {'id': id};
		$.ajax({
			
			type:'POST',
			url:'http://localhost/password_vault/vault_password_delete.php',
			data:datasend,
dataType: 'json',
                        crossDomain: true,
			cache:false,
			success:function(msg){


if(msg.status == 1){

alert(msg.message);
$(".loader-delete_"+id).hide();
$(".result-delete_"+id).html("<div style='color:white;background:green;padding:8px;border:none;'>" +msg.message+ "</div>");
setTimeout(function(){ $(".result-delete_"+id).html(''); }, 5000);
//location.reload();

$(".rec_"+id).animate({ backgroundColor: "#fbc7c7" }, "fast").animate({ opacity: "hide" }, "slow");

}


	if(msg.status == 0){

alert(msg.message);

$(".loader-delete_"+id).hide();
$(".result-delete_"+id).html("<div style='color:white;background:red;padding:8px;border:none;'>" +msg.message+ "</div>");
setTimeout(function(){ $(".result-delete_"+id).html(''); }, 5000);

}

}
			
});
}

// confirm ends




});
});











// Retrieve Vaults Secret Data

$(document).ready(function(){
//$('.get_btn').click(function(){
$(document).on( 'click', '.get_btn', function(){ 

var id = $(this).data('id');
//alert(id);


$(".loader-get_"+id).fadeIn(400).html('<br><div style="color:black;background:white;padding:10px;"><img src="ajax-loader.gif"> &nbsp;Please Wait, Retrieving Vault Password Secret Data...</div>');
var datasend = {'id': id};
		$.ajax({
			
			type:'POST',
			url:'http://localhost/password_vault/vault_password_secret_retrieve.php',
			data:datasend,
dataType: 'json',
                        crossDomain: true,
			cache:false,
			success:function(msg){

if(msg.status == 1){
alert(msg.message);
$(".loader-get_"+id).hide();
$(".result-get_"+id).html("<div style='color:black;'><b>Password/Secret: " +msg.secret+ "</b></div>");
//setTimeout(function(){ $(".result-get_"+id).html(''); }, 5000);

//$(".rec_"+id).animate({ backgroundColor: "#fbc7c7" }, "fast").animate({ opacity: "hide" }, "slow");

}


	if(msg.status == 0){

alert(msg.message);

$(".loader-get_"+id).hide();

$(".result-get_"+id).html("<div style='color:white;background:red;padding:8px;border:none;'>" +msg.message+ "</div>");
setTimeout(function(){ $(".result-get_"+id).html(''); }, 5000);

}

}
			
});





});
});











$(document).ready(function(){


$('#myModal_create_user').on('hidden.bs.modal', function() {
  $('.myform_clean_signup').empty();
 //alert("modal closed and content cleared");
});



$('#myModal_user_login').on('hidden.bs.modal', function() {
  $('.myform_clean_login').empty();
 //alert("modal closed and content cleared");
});

$('#myModal_reset_password').on('hidden.bs.modal', function() {
  $('.myform_clean_reset_password').empty();
 //alert("modal closed and content cleared");
});


$('#myModal_vault').on('hidden.bs.modal', function() {
  $('.myform_clean_v').empty();
 //alert("modal closed and content cleared");
});




});