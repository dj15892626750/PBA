<?php
	header("Access-Control-Allow-Origin:*");
	
	$username=$_POST["username"];
	$password=md5($_POST["password"]);
	
	include "public.php";
	
	$sql="SELECT * FROM pba_user WHERE phone='$username'";
	$result = mysql_query($sql);
	$array = array("res_code"=>1, "res_error"=>"");
	if($result){
		$res_body = array("status"=>0, "message"=>"*该手机号已被注册" . mysql_error());
	}
	else{
		// SQL语句
		$sql = "INSERT INTO pba_user(phone, password) VALUES('$username', '$password')";
		// 执行SQL语句
		$result = mysql_query($sql);
		if ($result) {
			$res_body = array("status"=>1, "username"=>$username, "message"=>"注册成功");
		} else {
			$res_body = array("status"=>0, "message"=>"*注册失败" . mysql_error());
		}
	}

	// 构建返回的关联数组
	$array["res_body"] = $res_body;
	// 返回JSON文本
	echo json_encode($array);
	// 关闭
	mysql_close();
?>