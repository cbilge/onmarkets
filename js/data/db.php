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
$feed = json_decode(Parse($bbg));
//adminn9rBZWt 
//ys9FljhPItJG
//title description link pubdate

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

// prepare and bind
$stmt = $conn->prepare("INSERT INTO bbg_rss (title, description, link, pubDate) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $title, $description, $link, $pubDate);


// set parameters and execute
foreach($feed->channel->item as $item){

    $title = $item->title;
    $description = $item->description;        
    $link = $item->link;
    $pubDate = $item->pubDate;
    echo $title . ' ' . $description . ' ' . $link . ' ' . $pubDate . '\n';

    $sel = "SELECT * FROM bbg_rss WHERE link='" . $link . "'";
    echo $sel;
    $result = $conn->query($sel);
    echo $result->num_rows;
    if ($result->num_rows = 0) {
        $stmt->execute();  
    }

}
//title = "John";
//$lastname = "Doe";
//$email = "john@example.com";
//$stmt->execute();

echo "New records created successfully";

$stmt->close();
$conn->close();

?>