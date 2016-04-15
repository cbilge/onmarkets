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

function pushtodb ($feedname, $feedurl){
echo "<h1>" . $feedname . "</h1>";
echo Parse($feedurl);
$source=$feedname;
$feed = json_decode(Parse($feedurl));

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
$stmt = $conn->prepare("INSERT INTO feeds (title, description, content, lead_image_url, link, pubDate, source) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $title, $description, $content, $lead_image_url, $link, $pubDate, $source);


// set parameters and execute
foreach($feed->channel->item as $item){
    if ($source == 'ft') {print_r ($feed);}
    $title = $item->title;
    echo "title: " . $title;
    $description = $item->description;        
    echo "\n Desc: " . $description;
    if ($source == 'rtrs') {
        $link = $item->guid;
    } else {
    $link = $item->link;
    }
    echo "\n link: " . $link;
    $pubDate = $item->pubDate;
    echo "\n Pub: " . $pubDate;
    $sel = "SELECT * FROM bbg_rss WHERE link='" . $link . "'";
    $result = $conn->query($sel);
    if ($result->num_rows == 0) {
        //get readability only if link not found
        $readbl = json_decode(readability($link));
        $content = $readbl->content;
        echo "\n content : ". $content;
        $lead_image_url = $readbl->lead_image_url;
        echo "\n lead img: ". $lead_image_url;
        $stmt->execute();  
        printf("Error: %s.\n", $stmt->error);
    }
}

echo "New records created successfully";

$stmt->close();
$conn->close();
}

$bbg = "http://www.newslookup.com/rss/business/bloomberg.rss";
$reuters = "http://feeds.reuters.com/reuters/topNews?irpc=69";
$ft = "http://www.ft.com/rss/home/europe";
$wsj = "http://online.wsj.com/xml/rss/3_7085.xml";
$bi = "http://feeds2.feedburner.com/businessinsider";
pushtodb("bbg", $bbg);
pushtodb("rtrs", $reuters);
pushtodb("ft", $ft);
pushtodb("wsj", $wsj);
pushtodb("bi", $bi);

?>