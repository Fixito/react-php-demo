<?php
require_once("pdo.php");

$user_name = isset($_POST["name"]) ?? "";

if ($user_name && !empty(trim($user_name))) {
  $sql = "INSERT INTO users (name) VALUES (:name)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    "name" => $user_name
  ]);
}
