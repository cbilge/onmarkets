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

$sql = "SELECT * FROM eco WHERE 1";
//echo $sql;
$result = $conn->query($sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rowTime = strtotime($r['date']);
    $today = date();
    if ($rowTime > date_modify($today, '-3 days') && $rowTime < date_modify($today, '+3 days')) {
        $rows[] = $r;    
    }
}
$calendar = array('eco' => $rows);
echo json_encode($calendar);

?>