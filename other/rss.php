<?php
$servername = "mysql12.000webhost.com";
$username = "a9561518_cbilge";
$password = "mysql1";
$dbname = "a9561518_onmark";
$tablename = "bloomberg_rss";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";

$stmt = $conn->prepare("INSERT INTO $tablename (title, description, link, pubDate, content, read) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssi", $title, $description, $link, $pubDate, $content, $read);

// set parameters and execute
$title = "John";
$description = "Doe";
$link = "http://www.johndoe.com";
$pubDate = "2016-02-15 16:00:00";
$content = "yo";
$read = 0;
$stmt->execute();

$stmt->close();
mysqli_close($conn);

?>

