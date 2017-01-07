<?php
session_start();
include_once('db_connect.php');

/* requires tutor_id, request_id, rating, points */
/* adds student_id automatically */
// updates rating of tutor and exchange credit points
// updates request_option as completed
// creates transaction

/* example
complete_transaction.php?tutor_id=2&rating=4&points=70&request_id=2
*/

// update rating of tutor
$sql = "UPDATE users SET rating=rating+{$_REQUEST['rating']} WHERE id='{$_REQUEST['tutor_id']}'";
if ($mysqli->query($sql)) {
  // take money from student
  $sql = "UPDATE users SET points=points-{$_REQUEST['points']} WHERE id='{$_SESSION['user_id']}'";
  if ($mysqli->query($sql)) {
    // give money to tutor
    $sql = "UPDATE users SET points=points+'{$_REQUEST['points']}' WHERE id='{$_REQUEST['tutor_id']}'";
    if ($mysqli->query($sql)) {
      // update request_option as completed
      $sql = "UPDATE request_options SET status='completed' WHERE request_id='{$_REQUEST['request_id']}' AND status='accepted'";
      if ($mysqli->query($sql)) {
        echo json_encode(['status'=>'success']);
      } else {
        echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);  
      }
    } else {
      echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);
    }
  } else {
    echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);
  }
} else {
  echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);
}

?>