<?php
function Parse ($url) {

	$fileContents= file_get_contents($url);

	$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);

	$fileContents = trim(str_replace('"', "'", $fileContents));

	$simpleXml = simplexml_load_string($fileContents);

	$json = json_encode($simpleXml);

	return $json;

}

function readability($link) {
    $url = "http://www.readability.com/api/content/v1/parser?url=" . $link . "&token=8554ae1a3f72567db4a0a1af7966f0242988f9ae";
    $ch = curl_init( $url );
  
      curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
      curl_setopt( $ch, CURLOPT_HEADER, true );
      curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
  
      curl_setopt( $ch, CURLOPT_USERAGENT, $_GET['user_agent'] ? $_GET['user_agent'] : $_SERVER['HTTP_USER_AGENT'] );
  
      list( $header, $contents ) = preg_split( '/([\r\n][\r\n])\\1/', curl_exec( $ch ), 2 );
  
      $status = curl_getinfo( $ch );
  
      curl_close( $ch );
    
      return $contents;
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
$stmt = $conn->prepare("INSERT INTO bbg_rss (title, description, content, lead_image_url, link, pubDate) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $title, $description, $content, $lead_image_url, $link, $pubDate);


// set parameters and execute
foreach($feed->channel->item as $item){

    $title = $item->title;
    $description = $item->description;        
    $link = $item->link;
    $pubDate = $item->pubDate;
    $sel = "SELECT * FROM bbg_rss WHERE link='" . $link . "'";
    $result = $conn->query($sel);
    echo $title;
    echo $result->num_rows;
    if ($result->num_rows == 0) {
        //get readability only if link not found
        echo $link;
        $readbl = readability($link);
        echo $readbl;
        $content = $readbl->content;
        echo $content;
        $lead_image_url = $readbl->lead_image_url;
        $stmt->execute();  
    }
}

echo "New records created successfully";

$stmt->close();
$conn->close();

?>