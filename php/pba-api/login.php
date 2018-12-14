<?php
	header("Access-Control-Allow-Origin:*");
	
	$username=$_POST["username"];
	$password=md5($_POST["password"]);
	$remember=$_POST["remember"];
	
	include "public.php";
	
	// SQL语句
	$sql = "SELECT * FROM pba_user WHERE phone='$username' AND password='$password'";
	// 执行SQL语句
	$result = mysql_query($sql);
	$array = array("res_code"=>1, "res_error"=>"");
	if($row=mysql_fetch_assoc($result)) {
		$array["res_body"] = array("status"=>1,"remember"=>$remember ,"info"=>$row);
	} else {
		$array["res_body"] = array("status"=>0,"msg"=>"*用户名或密码错误");
	}
	echo json_encode($array);
	mysql_close();
?>