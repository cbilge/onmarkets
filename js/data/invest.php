<?php

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
        # Show the <a href>
        echo $row->getAttribute('event_timestamp');

        if ($row->hasAttribute('event_timestamp')){
            foreach ($row->childNodes as $cell) {
                #echo $cell->attributes;
            }
        }
}

?>
