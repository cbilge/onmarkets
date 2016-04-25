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
    $today = strtotime(date('Y-m-d'));
    $workDay = date('w');
    
    #Workday Adjustments
    $toStart = 1;
    $toEnd = 2;
    if ($workDay = 5) {
        #Friday
        $toEnd = 4;
    } elseif ($workDay = 6) {
        #Saturday
        $toEnd = 3;
    } elseif ($workDay = 0) {
        #Sunday
        $toStart = 2;
    } elseif ($workDay = 1) {
        #Monday
        $toStart = 3;
    }

    $dateStart = $today - 60*60*24*$toStart;
    $dateEnd = $today + 60*60*24*$toEnd;

    if ($rowTime > $dateStart && $rowTime < $dateEnd) {
        $rows[] = $r;    
    }
}
$calendar = array('eco' => $rows);
echo json_encode($calendar);

?>