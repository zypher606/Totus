<?php
session_start();
include_once('db_connect.php');

/* requires request_id */
/* adds student_id automatically */

/* example
fetch_options.php?request_id=2
*/

$sql = "SELECT * FROM request_options WHERE request_id='{$_REQUEST['request_id']}' AND student_id='{$_SESSION['user_id']}'";
  
$res = $mysqli->query($sql);
$res->data_seek(0); // seek result pointer to start
$reply = array();
while ($row = $res->fetch_assoc()) {
  $reply[] = $row;
}
$res->close();
echo json_encode($reply);

?>