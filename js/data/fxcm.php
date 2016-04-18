<?php
function Parse ($url) {

	$fileContents= file_get_contents($url);

	$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);

	$fileContents = trim(str_replace('"', "'", $fileContents));

	$simpleXml = simplexml_load_string($fileContents);

    foreach($simpleXml->children() as $rates) { 
        $rates->Symbol = $rates['Symbol'];
    } 

	$json = json_encode($simpleXml);

	return $json;

}

$fxcm = "http://rates.fxcm.com/RatesXML";

echo Parse($fxcm);
?>