<?php
// add-product.php is for inserting new product into the database.
// Method: POST - http://localhost/php-react/add-product.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->Prod_id)
    && isset($data->Prod_Name)
    && isset($data->Prod_Price)
    && isset($data->Prod_Cost)
    && !empty(trim($data->Prod_id))
    && !empty(trim($data->Prod_Name))
    && !empty(trim($data->Prod_Price))
    && !empty(trim($data->Prod_Cost))
) {
    $ProdID = mysqli_real_escape_string($db_connection, trim($data->Prod_id));
    $ProdName = mysqli_real_escape_string($db_connection, trim($data->Prod_Name));
    $ProdPrice = mysqli_real_escape_string($db_connection, trim($data->Prod_Price));
    $ProdCost = mysqli_real_escape_string($db_connection, trim($data->Prod_Cost));
    $insertUser = mysqli_query($db_connection, "INSERT INTO `product`(`ProdID`,`ProdName`,`UnitPrice`,`Cost`) VALUES('$ProdID','$ProdName','$ProdPrice','$ProdCost')");
    if ($insertUser) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "product Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "product Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>