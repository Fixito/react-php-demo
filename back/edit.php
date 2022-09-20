<?php
require_once("./pdo.php");

$data =
  json_decode(file_get_contents("php://input"), true);
$user_name = trim(htmlentities($data["name"]));
$user_id = htmlentities($data["user_id"]);

if ($user_name) {
  $sql = "UPDATE users SET name = :name WHERE  user_id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    "id" => $user_id,
    "name" => $user_name
  ]);
}
