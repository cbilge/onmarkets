<?php
function Parse ($url) {

	$fileContents= file_get_contents($url);

	$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);

	$fileContents = trim(str_replace('"', "'", $fileContents));

	$simpleXml = simplexml_load_string($fileContents);

	$json = json_encode($simpleXml);

	return $json;

}

$bbg = "http://www.newslookup.com/rss/business/bloomberg.rss";

echo Parse($bbg);

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

$sql = "SELECT title, description, content, lead_image_url, link, pubDate FROM bbg_rss ORDER BY updateTime DESC";
$result = $conn->query($sql);

echo $result;

?>