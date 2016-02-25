<<<<<<< HEAD
<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
/* 
mysql12.000webhost.com	
a9561518_onmark
a9561518_cbilge
mysql1
*/

$servername = "mysql12.000webhost.com";
$username = "a9561518_cbilge";
$password = "mysql1";
$dbname = "a9561518_onmark";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";

/*$sql = "CREATE DATABASE $dbname";
if (mysqli_query($conn, $sql)) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}*/

$sql = "CREATE TABLE bloomberg_rss (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR(50) NOT NULL,
description TEXT,
link TEXT,
pubDate TIMESTAMP,
content MEDIUMTEXT,
read INT(6)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table bloomberg_rss created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

mysqli_close($conn);
?>

</body>
=======
<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
/* 
mysql12.000webhost.com	
a9561518_onmark
a9561518_cbilge
mysql1
*/

$servername = "mysql12.000webhost.com";
$username = "a9561518_cbilge";
$password = "mysql1";
$dbname = "a9561518_onmark";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";

/*$sql = "CREATE DATABASE $dbname";
if (mysqli_query($conn, $sql)) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}*/

$sql = "CREATE TABLE bloomberg_rss (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR(50) NOT NULL,
description TEXT,
link TEXT,
pubDate TIMESTAMP,
content MEDIUMTEXT,
read INT(6)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table bloomberg_rss created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

mysqli_close($conn);
?>

</body>
>>>>>>> f830985772d9b93720695f1f65c86c73f5381cab
</html>