<?php
// update-product.php is for updating an existing product.
// Method: POST - http://localhost/php-react/update-product.php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->Prodid)
    && isset($data->ProdName)
    && isset($data->ProdPrice)
    && isset($data->ProdCost)
    && !empty(trim($data->Prodid))
    && !empty(trim($data->ProdName))
    && !empty(trim($data->ProdPrice))
    && !empty(trim($data->ProdCost))
) {
    $ProdName = mysqli_real_escape_string($db_connection, trim($data->ProdName));
    $ProdPrice = mysqli_real_escape_string($db_connection, trim($data->ProdPrice));
    $ProdCost = mysqli_real_escape_string($db_connection, trim($data->ProdCost));
    $updateproduct = mysqli_query($db_connection, "INSERT INTO `product`(`ProdID`,`ProdName`,`UnitPrice`,`Cost`) VALUES('$ProdID','$ProdName','$ProdPrice','$ProdCost')");
    if ($updateproduct) {
        echo json_encode(["success" => 1, "msg" => "product Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "product Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>