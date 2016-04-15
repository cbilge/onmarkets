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
$today = date();
$cutdate = date('Y-m-d', strtotime('-3 days', $today));
echo $cutdate;
$sql = "SELECT * FROM feeds WHERE updateTime < " . $cutdate;
//echo $sql;
$result = $conn->query($sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
$feed = array('items' => $rows);
echo json_encode($feed);

?>
