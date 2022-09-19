<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, DELETE");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

try {
  $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "Connexion échouée: " . $e->getMessage();
}
