<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



$email = strip_tags($_POST['email']);
$password = strip_tags($_POST['password']);
$fullname = strip_tags($_POST['fullname']);
$pass = $password;


if($password ==''){

echo "<div  style='background:red;color:white;padding:10px;border:none;'>Password Cannot be Empty</div><br>";
exit();
}

if($email ==''){

echo "<div  style='background:red;color:white;padding:10px;border:none;'>Email Address Cannot be Empty</div><br>";
exit();
}


$em= filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$em){
echo "<div  style='background:red;color:white;padding:10px;border:none;' id='err'>Email Address is Invalid</div>";
exit();
}







if($fullname ==''){

echo "<div  style='background:red;color:white;padding:10px;border:none;'>Fullname Cannot be Empty</div><br>";
exit();
}

include('settings.php');

if($authn_intel_accesstoken ==''){
echo "<div  style='background:red;color:white;padding:10px;border:none;'>Please Ask Admin to Set Pangea AuthN INTEL Access Token at <b>settings.php</b> File</div><br>";
exit();
}



$data_param= '{
  "email": "'.$email.'",
  "authenticator": "'.$pass.'",
  "id_provider": "password",
"profile":{
"fullname": "'.$fullname.'"}
}';





$url ="https://authn.aws.us.pangea.cloud/v1/user/create";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', "Authorization: Bearer $authn_intel_accesstoken"));  
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_param);
//curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$output = curl_exec($ch); 


$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// catch error message before closing
if (curl_errno($ch)) {
    //echo $error_msg = curl_error($ch);
}

curl_close($ch); 





if($output ==''){

echo "<div class='dangerx'>
 Please Ensure there is Internet Connections and Try Again</div><br>";
exit();
}


$json = json_decode($output, true);
$user_id = $json['result']['id'];
$request_id = $json['request_id'];
$summary = $json['summary'];
$status = $json['status'];


if($request_id !='' && $status !='Success' ){
echo "<div class='dangerx'>
 User creation Failed. Try Again.  Error: $summary  </div><br>";
exit();

}





if($request_id !='' && $status =='Success'){
echo "<div class='successx'>User Created SuccessFully</div><br>";
echo "<div class='well'>

                         <b>UserId :</b> $user_id<br>
                         <b>Summary:</b> $summary<br>
                           <b>Status:</b> $status<br>
                            
        
</div><br>";

}





?>