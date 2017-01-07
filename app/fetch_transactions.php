<?php
session_start();
include_once('db_connect.php');

$sql = 'SELECT * FROM transactions';
$res = $mysqli->query($sql);
$res->data_seek(0); // seek result pointer to start
$reply = array();
while ($row = $res->fetch_assoc()) {
  $reply[] = $row;
}
$res->close();
echo json_encode($reply);

?>