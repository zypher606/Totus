<?php
session_start();
include_once('db_connect.php');

/* requires lat,lng,time,skills,description */
/* adds student_id automatically */

/* example
create_request.php?lat=32.192653&lng=27.6257884&time=2017-01-09 12:18:31&skills=design,ui&description=another description about the lesson
*/

/*
$keys = explode(",","poster_id,type,lat,lng,time,skills,active,description");
$values = array();
foreach ($keys as $key) {
  $values[] = $_GET[$key];
}
$values = implode(",", $values);
$sql = "INSERT INTO requests (poster_id,type,lat,lng,time,skills,active,description) VALUES ($values)";
*/
$_REQUEST['student_id'] = $_SESSION['user_id'];
$sql = insert_input('requests', 'student_id,title,lat,lng,skills,description');
//echo $sql;
if ($mysqli->query($sql)) {
  $sql = "UPDATE requests SET time=FROM_UNIXTIME({$_REQUEST['time']}) WHERE id={$mysqli->insert_id}";
  //echo $sql;
  if ($mysqli->query($sql)) {
    if (isset($_SESSION['redirect'])) {
      redirect('../Dashboard');  
    } else {
      echo json_encode(['status'=>'success']);
    }
  } else {
    if (isset($_SESSION['redirect'])) {
      $url = $_SESSION['redirect'];
      unset($_SESSION['redirect']);
      $_SESSION['failed']=true;
      redirect($url);
    } else {
      echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);
    }
  }
} else {
    if (isset($_SESSION['redirect'])) {
      $url = $_SESSION['redirect'];
      unset($_SESSION['redirect']);
      $_SESSION['failed']=true;
      redirect($url);
    } else {
      echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);
    }
}
?>