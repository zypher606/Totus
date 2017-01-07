<?php
session_start();
include_once('db_connect.php');

/* example
fetch_users.php?type=by_id&user_id=1
*/

switch ($_REQUEST['type']) {
  case 'by_id':
    if (isset($_REQUEST['user_id'])) {
      $sql = "SELECT * FROM users WHERE id='{$_REQUEST['user_id']}'";
      $res = $mysqli->query($sql);
      $res->data_seek(0); // seek result pointer to start
      $reply = array();
      while ($row = $res->fetch_assoc()) {
        $reply = $row;
      }
      $res->close();
    }
    break;
  default:
    $reply = array(); 
    break;
}

echo json_encode($reply);

?>