<?php
// all-product.php is to fetch all product that exist in the database.
// Method: GET - http://localhost/php-react/all-product.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$allproduct = mysqli_query($db_connection, "SELECT ProdID as ProdID, ProdName as ProdName, UnitPrice as ProdPrice, Cost as ProdCost FROM `product`");
if (mysqli_num_rows($allproduct) > 0) {
    $all_product = mysqli_fetch_all($allproduct, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "product" => $all_product], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>
