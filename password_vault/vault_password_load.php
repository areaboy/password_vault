<?php
//error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//$vault = strip_tags($_POST['vault']);

include('settings.php');

if($vault_intel_accesstoken ==''){
echo "<div  style='background:red;color:white;padding:10px;border:none;'>Please Ask Admin to Set Pangea Vault INTEL Access Token at <b>settings.php</b> File</div><br>";
exit();
}


// Get Vault List

$data_param= '{}';





$url ="https://vault.aws.us.pangea.cloud/v1/list";
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

echo "<div class='dangerx'>
 Please Ensure there is Internet Connections and Try Again</div><br>";
exit();
}





$json = json_decode($output, true);
$user_id = $json['result']['id'];
$request_id = $json['request_id'];
$summary = $json['summary'];
$status = $json['status'];

$res = $json['result']['items'];


if($request_id !='' && $status !='Success' ){
echo "<div class='dangerx'>
 Retrieving Password Failed. Try Again.  Error: $summary  </div><br>";
exit();

}



if($res ==[] ){
echo "<div class='dangerx'>&nbsp;&nbsp;&nbsp;&nbsp;You Have No Data in Your Vaults Yet </div><br>";
exit();

}




if($request_id !='' && $status =='Success'){

//echo "<div class='successx'>Password Vaults Info SuccessFully Retrieved </div><br>";

}




echo '<div class="row"><div class="col-sm-1"></div>
<div class="col-sm-10">
<table border="0" cellspacing="2" cellpadding="2" class="table table-striped_no table-bordered table-hover"> 
      <tr> 
          <th> <font face="Arial">Password/Secret Title</font> </th> 
          <th> <font face="Arial">Login Email/Username</font> </th> 
          <th> <font face="Arial">Password(Secret)</font> </th> 
          <th> <font face="Arial">Created By</font> </th> 
          <th> <font face="Arial">Time Created</font> </th> 
<th> <font face="Arial">Action</font> </th> 


      </tr>';


foreach($json['result']['items'] as $row){

$p_title = $row['name'];

if($p_title !='personal'){
$type = $row['type'];
$password_title = $row['name'];
$secret = $row['secret'];
$id = $row['id'];
$created_at = $row['created_at'];
$email = $row['metadata']['email'];
$created_by = $row['metadata']['created_by'];
$color = $row['metadata']['color'];
$first_character = substr($password_title, 0, 1);

 echo "<tr class='rec_$id' > 
<td>
<div style=' color: #fff; display: block; max-width:40px;  border-radius: 48px; border: 1px solid #2E8E12; background: $color; padding: 8px 12px;font-size:20px;'><b>$first_character</b></div>

<b>$password_title</b>
</td>

<td>$email</td> 
                  <td>
   <div class='loader-get_$id'></div>
   <div class='result-get_$id'></div>
<button class='btn btn-success get_btn' data-id='$id'  title='Retrieve Password/Secret'>Retrieve Password/<br>Secret</button>

</td>                
                  <td>$created_by</td> 
                  <td>$created_at</td> 
                 
 <td>
   <div class='loader-delete_$id'></div>
   <div class='result-delete_$id'></div>
<button class='btn btn-danger delete_btn' data-id='$id'  title='Delete Data'>Delete Data</button>


</td>
              </tr>";



}

}

echo "</div><div class='col-sm-1'></div></div>";












?>