<?php
require_once("pdo.php");

try {
  $data =
    json_decode(file_get_contents("php://input"), true);

  $user_name = trim(htmlspecialchars($data["name"]));

  if ($user_name) {
    $sql = "INSERT INTO users (name) VALUES (:name)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      "name" => $user_name
    ]);
  }

  echo json_encode($data);
  header('HTTP/1.1 201 Created');
} catch (Exception $e) {
  header('HTTP/1.1 500 Internal Server Error');
}
