<?php
require_once("pdo.php");

$user_id = $_GET["id"];
$user_id = $_GET["id"] ?? "";

if ($user_id && !empty(trim($user_id))) {
  $sql = "DELETE FROM users WHERE user_id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    "id" => $user_id
  ]);
}
