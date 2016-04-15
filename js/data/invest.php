<?php
function getTable(){
$html = "http://ec.forexprostools.com/?columns=exc_currency,exc_actual,exc_forecast,exc_previous&countries=32,37,55,72,22,17,93,14,48,10,35,7,53,38,110,11,26,63,4,5&calType=week&timeZone=63&lang=1";

$dom = new DOMDocument;
$dom->loadHTML($html);
$table = $dom->getElementByIdName('ecEventsTable');
$rows = $table->getElementsByTagName('tr');

$data = array();
foreach ($rows as $row) {
    $time = $currency = $name = $actual = $forecast = $previous = "";
    $cells = $row->getElementsByTagName('td');
    foreach ($cells as $cell) {
        $class = $cell->getAttribute('class');
        if (strpos($class, 'time') !== false) {
            $time = $cell;
        } elseif (strpos($class, 'flagCur') !== false){
            $currency = $cell->nodeValue;
        } elseif (strpos($class, 'event') !== false){
            $name = $cell->nodeValue;
        } elseif (strpos($class, 'act') !== false){
            $actual = $cell->nodeValue;
        } elseif (strpos($class, 'fore') !== false){
            $forecast = $cell->nodeValue;
        } elseif (strpos($class, 'prev') !== false){
            $previous = $cell->nodeValue;
        }
    }
    $data[] = array('time' => $time, 'currency' => $currency, 'name' => $name, 'actual' => $actual, 'forecast' => $forecast, 'previous' => $previous);
}

return $data;
}

echo getTable();

?>
