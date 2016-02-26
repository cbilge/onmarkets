<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST["data"];
    $ver = $_POST["ver"];
    if ($ver == "cbilge") {}
        $myfile = fopen("daily.txt", "w") or die("Unable to open file!");
        fwrite($myfile, $data);
        fclose($myfile);
    }
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    echo("yo");
}
?>
