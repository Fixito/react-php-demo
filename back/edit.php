<?php
require_once("./pdo.php");

try {
  $data =
    json_decode(file_get_contents("php://input"), true);
  $user_name = trim(htmlspecialchars($data["name"]));
  $user_id = htmlspecialchars($data["user_id"]);

  if ($user_name) {
    $sql = "UPDATE users SET name = :name WHERE  user_id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      "id" => $user_id,
      "name" => $user_name
    ]);
  }

  echo json_encode($data);
} catch (Exception $e) {
  header('HTTP/1.1 404 Not Found');
}
