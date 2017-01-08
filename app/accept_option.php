<?php
session_start();
include_once('db_connect.php');

/* requires request_id, option_id, level */
/* updates status and request */

/* example
accept_option.php?request_id=2&option_id=2&level=2
*/
function success() {
  if (isset($_SESSION['redirect'])) {
    redirect('../Dashboard');
  } else {
    echo json_encode(['status'=>'success']);
  }
}

function failure() {
  if (isset($_SESSION['redirect'])) {
    redirect($_SESSION['redirect']);
  } else {
    echo json_encode(['status'=>'failed', 'error'=>$mysqli->error]);    
  }
}
// update remaining option status
$sql = "UPDATE request_options SET status='denied' WHERE request_id='{$_REQUEST['request_id']}'";
if ($mysqli->query($sql)) {
  // update accepted option status
  $sql = "UPDATE request_options SET status='accepted' WHERE id='{$_REQUEST['option_id']}'";
  if ($mysqli->query($sql)) {
    // update request level
    $sql = "UPDATE requests SET level='{$_REQUEST['level']}',active='0' WHERE id='{$_REQUEST['option_id']}'";
    if ($mysqli->query($sql)) {
      // update request level
      success();
    } else {
      failure();
    }
  } else {
    failure();
  }
} else {
  failure();
}

?>