<?php
require_once("pdo.php");

try {
  $data = json_decode(file_get_contents("php://input"), true);
  $user_id = $data["user_id"];

  $sql = "DELETE FROM users WHERE user_id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    "id" => $user_id
  ]);
  echo json_encode($data);
} catch (Exception $e) {
  header('HTTP/1.1 404 Not Found');
}
