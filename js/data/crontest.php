<?php
    function Parse ($url) {

	$fileContents= file_get_contents($url);

	$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);

	$fileContents = trim(str_replace('"', "'", $fileContents));

	$simpleXml = simplexml_load_string($fileContents);

	$json = json_encode($simpleXml);

	return $json;

}

$fxcm = "http://rates.fxcm.com/RatesXML";

$tickers = Parse($fxcm);

foreach($tickers as $ticker){
    $sym = $ticker['@attributes']['Symbol'];
    $last = $ticker['Bid'];
    $put = '{' . $sym . ':' . $last . '}';

    file_put_contents(getenv('OPENSHIFT_REPO_DIR').'js/data/crontest.txt', $put, FILE_APPEND);
}
$newcont = date('d.m.y') . Parse($fxcm);
file_put_contents(getenv('OPENSHIFT_REPO_DIR').'js/data/crontest.txt', $newcont, FILE_APPEND);
?>
