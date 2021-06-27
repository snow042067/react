<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
$sql = "DELETE FROM `salesorder` WHERE `OrderId`=$data->OrderId;";
$query = mysqli_query($db_connection, $sql);
mysqli_autocommit($db_connection, false);
$sql = "DELETE FROM `orderdetail` WHERE `OrderId`=$data->OrderId;";
$query = mysqli_query($db_connection, $sql);
mysqli_commit($db_connection);
if ($query) {
    echo json_encode(["success" => 1, "msg" => "Order Deleted"]);
} else {
    echo json_encode(["success" => 0, "msg" => $data->OrderId]);
}
