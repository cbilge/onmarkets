<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST["data"];
    $ver = $_POST["ver"];
    echo $data + $ver;
    if ($ver == "cbilge") {
        $myfile = fopen("daily.txt", "w") or die("Unable to open file!");
        fwrite($myfile, $data);
        fclose($myfile);
        echo "done";
    }
}
elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    echo "yo";
}
?>
