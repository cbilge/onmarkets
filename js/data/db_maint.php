<?php
$servername = "127.5.102.2";
$username = "adminn9rBZWt";
$password = "ys9FljhPItJG";
$dbname = "php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "DELETE FROM feeds WHERE updateTime < timestampadd(day, -2, now())";
$result = $conn->query($sql);

$sql = "DELETE FROM eco WHERE updateTime < timestampadd(day, -7, now())";
$result = $conn->query($sql);

$conn->close();

?>
