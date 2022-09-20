<?php
require_once("pdo.php");

$data =
  json_decode(file_get_contents("php://input"), true);

$user_name = trim(htmlentities($data["name"]));

if ($user_name) {
  $sql = "INSERT INTO users (name) VALUES (:name)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    "name" => $user_name
  ]);
}
