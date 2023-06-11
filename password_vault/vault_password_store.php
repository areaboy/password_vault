<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



$email = strip_tags($_POST['email']);
$password = strip_tags($_POST['password']);
 $fullname = strip_tags($_POST['fullname']);
 $title = strip_tags($_POST['title']);
 $color = strip_tags($_POST['color']);
$pass = $password;



if($password ==''){

//echo "<div  style='background:red;color:white;padding:10px;border:none;'>Password Cannot be Empty</div><br>";
exit();
}

if($email ==''){

//echo "<div  style='background:red;color:white;padding:10px;border:none;'>Email Address Cannot be Empty</div><br>";
exit();
}





if($fullname ==''){

//echo "<div  style='background:red;color:white;padding:10px;border:none;'>Fullname Cannot be Empty</div><br>";
exit();
}

include('settings.php');

if($vault_intel_accesstoken ==''){

$response = ['status' => 0, 'message' => "Please Ask Admin to Set Pangea VAULT INTEL Access Token at settings.php File"];
echo json_encode($response);

exit();
}



$data_param= '{
  "name": "'.$title.'",
"folder":"/personal",
"metadata":{"created_by": "'.$fullname.'","email":"'.$email.'","color": "'.$color.'"},
  "secret": "'.$pass.'"
}';



$url ="https://vault.aws.us.pangea.cloud/v1/secret/store";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', "Authorization: Bearer $vault_intel_accesstoken"));  
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
$response = ['status' => 0, 'message' => "Please Ensure there is Internet Connections and Try Again"];
echo json_encode($response);

exit();
}


$json = json_decode($output, true);
$request_id = $json['request_id'];
$summary = $json['summary'];
$status = $json['status'];


if($request_id !='' && $status !='Success' ){

$response = ['status' => 0, 'message' => " Password Secret Vaults Creation Failed. Try Again.  Error: $summary "];
echo json_encode($response);

exit();

}




if($request_id !='' && $status =='Success'){

$response = ['status' => 1, 'message' => " Password Secret Vaults Creation SuccessFully "];
echo json_encode($response);

}





?>