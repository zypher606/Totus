<?php
session_start();
include_once('db_connect.php');

/* example
fetch_listings.php
*/
/*
$sql = 'SELECT * FROM offers';
$res = $mysqli->query($sql);
$res->data_seek(0); // seek result pointer to start
$offers = array();
while ($row = $res->fetch_assoc()) {
  $offers[] = $row;
}
$res->close();
*/
//$sql = 'SELECT * FROM requests WHERE active=1';
$sql = 'SELECT x.id as id,title,student_id,level,lat,lng,time,x.skills as skills,active,description,y.name as name,y.rating as rating FROM requests as x JOIN users as y on x.student_id = y.id WHERE x.active=1';
$res = $mysqli->query($sql);
$res->data_seek(0); // seek result pointer to start
$requests = array();
while ($row = $res->fetch_assoc()) {
  $requests[] = $row;
}
$res->close();
/*
if (isset($_REQUEST['type'])) {
  switch($_REQUEST['type']) {
    case 'offer':
      $reply = $offers;
      break;
    case 'request':
      $reply = $requests;
      break;
    default:
      $reply = array_merge($requests, $offers);
  }
} else {
  $reply = array_merge($requests, $offers);
}
*/
echo json_encode($requests);

?>