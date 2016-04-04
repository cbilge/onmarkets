<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST["data"];
    $ver = $_POST["ver"];
    $on = $_POST["on"];
    $eco = $_POST["eco"];
    echo $data + $ver;
    if ($ver == "cbilge") {
        $myfile = fopen(getenv('OPENSHIFT_REPO_DIR')."js/data/daily.txt", "w") or die("Unable to open file!");
        fwrite($myfile, $data);
        fclose($myfile);
        
        $myfile = fopen(getenv('OPENSHIFT_REPO_DIR')."js/data/overnight.txt", "w") or die("Unable to open file!");
        fwrite($myfile, $on);
        fclose($myfile);

        $myfile = fopen(getenv('OPENSHIFT_REPO_DIR')."js/data/eco.txt", "w") or die("Unable to open file!");
        fwrite($myfile, $eco);
        fclose($myfile);

        echo "done";
    }
}
elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    echo "yo";
}
?>
