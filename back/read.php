<?php
require_once("pdo.php");

try {
  $stmt = $pdo->query("SELECT * FROM users");
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($rows);
} catch (Exception $e) {
  header('HTTP/1.1 500 Internal Server Error');
}
