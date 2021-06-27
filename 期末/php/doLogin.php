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

if (
    isset($data->EmpId)
    && isset($data->Phone)
) {
    $id = mysqli_real_escape_string($db_connection, trim($data->EmpId));
    $phone = mysqli_real_escape_string($db_connection, trim($data->Phone));
    $query = mysqli_query($db_connection, "SELECT * FROM `employee` WHERE `EmpId`= '$id' AND `Phone`= '$phone'");
    if (mysqli_num_rows($query) == 1) {
        $user = mysqli_fetch_all($query, MYSQLI_ASSOC);
        echo json_encode(["success" => 1, "msg" => "Logged in", "user" =>  $user]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Login failed"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
