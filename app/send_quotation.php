<?php
session_start();
include_once('db_connect.php');
/* requires request_id, student_id, points, level */
/* adds status and tutor_id automatically */

/* example
send_quotation.php?request_id=2&student_id=1&points=70&level=2
*/

$_REQUEST['tutor_id'] = $_SESSION['user_id'];
$_REQUEST['status'] = 'ongoing';
$sql = insert_input('request_options', 'request_id,student_id,tutor_id,status,points,level');
if (isset($_SESSION['redirect'])) {
  if ($mysqli->query($sql)) {
    redirect("../Dashboard");
  } else {
    $url = $_SESSION['redirect'];
    unset($_SESSION['redirect']);
    $_SESSION['failed']=true;
    redirect($url);
  }
}
if ($mysqli->query($sql)) {
  echo json_encode(['status'=>'success']);
} else {
  echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);
}
?>