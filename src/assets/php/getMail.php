<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");

$box = $_GET['box'];
$labels = ['star', 'important', 'work', 'notes'];
$connection = new PDO('mysql:host=127.0.0.1:3306;dbname=mydb', "root", "password");
$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (in_array($box, $labels)) {

    $labelTable = letter_label_ . $box;


    $query = "SELECT
    t1.letter_id as id, 
    t1.letter_title as title, 
    t1.letter_body as body, 
    t1.letter_isRead as isRead, 
    t1.letter_isStarred as isStarred, 
    DATE_FORMAT(t1.letter_date, '%b %d' ) as date,
    t2.person_email as email, 
    t2.person_fullname as fullName
        FROM letters  as t1
		INNER JOIN person as t2 ON t2.person_id = t1.person_person_id AND t1.$labelTable = 1
        ORDER BY date";

    $stmt = $connection->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);

    exit();
};

$query = "SELECT 
t1.letters_letter_id as id, 
t2.letter_title as title, 
t2.letter_body as body, 
t2.letter_isRead as isRead, 
t2.letter_label_star as isStarred, 
DATE_FORMAT(t2.letter_date, '%b %d' ) as date,
t3.person_email as email, 
t3.person_fullname as fullName
    FROM $box  as t1
    INNER JOIN letters as t2 ON t1.letters_letter_id = t2.letter_id
    INNER JOIN person as t3 ON t3.person_id = t2.person_person_id
    ORDER BY date";
$stmt = $connection->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

?>
