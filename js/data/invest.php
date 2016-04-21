<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

function pushtodb($jsonData) {
    $dbData = json_decode($jsonData);

    $servername = "127.5.102.2";
    $username = "adminn9rBZWt";
    $password = "ys9FljhPItJG";
    $dbname = "php";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO eco (date, country, name, actual, survey, prior) VALUES (?, ?, ?, ?, ?, ?)");
    
    if ($stmt === false) {
      echo $conn->error;
    }

    $stmt->bind_param("ssssss", $date, $country, $name, $actual, $survey, $prior);

    $stmtup = $conn->prepare("UPDATE eco SET actual=?, prior=? WHERE id=?");

    if ($stmtup === false) {
      echo $conn->error;
    }

    $stmtup->bind_param("ssi", $actual, $prior, $id);

    foreach($dbData->eco as $dbItem){

        $date = $dbItem['date'];
        $country= $dbItem['country'];
        $name= $dbItem['name'];
        $actual= $dbItem['actual'];
        $survey= $dbItem['survey'];
        $prior= $dbItem['prior'];

        var_dump($dbItem);

        $sel = "SELECT * FROM eco WHERE date='" . $date . "' AND name='" . $name . "'";
        $result = $conn->query($sel);
        if ($result->num_rows == 0) {
            $stmt->execute();    
        } else {
            $id = $result["id"];
            $stmtup->execute(); 
        }
    }

    #echo "New records created successfully";

    $stmt->close();
    $conn->close();
}


$url = "http://ec.forexprostools.com/?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&category=_employment,_economicActivity,_inflation,_credit,_centralBanks,_confidenceIndex,_balance,_Bonds&importance=1,2,3&features=datepicker,timezone,timeselector,filters&countries=32,37,55,72,22,17,93,14,48,10,35,7,53,38,110,11,26,63,4,5&calType=day&timeZone=63&lang=1";


# Use the Curl extension to query Google and get back a page of results
$ch = curl_init();
$timeout = 5;
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$html = curl_exec($ch);
curl_close($ch);

# Create a DOM parser object
$dom = new DOMDocument();

# Parse the HTML from Google.
# The @ before the method call suppresses any warnings that
# loadHTML might throw because of invalid HTML in the page.
@$dom->loadHTML($html);

# Iterate over all the <a> tags

foreach($dom->getElementsByTagName('tr') as $row) {

        #echo $row->getAttribute('event_timestamp');

        if ($row->hasAttribute('event_timestamp')) {
            $children = $row->childNodes; 
            #echo 'ROW';
            #var_dump($row);
            foreach ($children as $child) { 
                #echo 'CHILD';
                #var_dump($child);
                #echo "\n\n\n";
                $data = $child->nodeValue;
                #echo 'data ' . $data; 
                #var_dump($child->wholeText);
                
                foreach ($child->attributes as $attr){
                    #echo 'ATTRIBUTE';
                    if ($attr->name == 'class') {
                        $key = $attr->nodeValue;
                        #echo 'key ' . $key;
                        $dataArr[$key] = $data;
                    }
                }
            } 
            #print_r($dataArr);
            $dataCollection[] = $dataArr;
        }

}

#print_r($ecoTable);

foreach($dataCollection as $orgData) {
    $keys = array_keys($orgData);
    $dataPoint['date'] = date('Y-m-d H:i:s',strtotime($orgData[$keys[0]]));
    $dataPoint['country'] = substr($orgData[$keys[1]],-3);
    $dataPoint['name'] = $orgData[$keys[3]];
    $dataPoint['actual'] = $orgData[$keys[4]];
    $dataPoint['survey'] = $orgData[$keys[5]];
    $dataPoint['prior'] = $orgData[$keys[6]];
    $ecoTable[] = $dataPoint;
}

$ecoWrap['eco'] = $ecoTable;
$jsonData = json_encode($ecoWrap);

$jsonData = str_replace('\u00a0','',$jsonData);

echo $jsonData;

pushtodb($jsonData);

?>
