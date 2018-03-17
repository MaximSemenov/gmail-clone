<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");

$param = $_GET['box'];
// $param = mysql_real_escape_string($param);
$link = mysqli_connect("127.0.0.1:3306", "root", "Magneto22&", "mydb")
    or die("There is a problem with connection to the database: " . mysql_error() . ":(");

$result = mysqli_query($link, "SELECT 
t1.letters_letter_id as id, 
t2.letter_title as title, 
t2.letter_body as body, 
t2.letter_isRead as isRead, 
t2.letter_date as datestamp, 
t3.person_email as email, 
t3.person_fullname as fullname
    FROM '$param'  as t1
    INNER JOIN letters as t2 ON t1.letters_letter_id = t2.letter_id
    INNER JOIN person as t3 ON t3.person_id = t2.person_person_id");

$arr = [];

    // echo json_encode(mysqli_fetch_object($result)) ;

while ($obj = mysqli_fetch_object($result)) {

    array_push($arr, $obj);

}

echo json_encode($_GET['box']);
echo json_encode($arr);

?>