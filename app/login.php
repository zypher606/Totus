<?php
  session_start();
  include_once('db_connect.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SQL executer</title>
</head>
<body>
  <form action="#" method="get">
    <input type="text" name="user_id" placeholder="User ID" style="width:80%">
    <input type="submit" value="Submit Query">
  </form>
  <button onclick="window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname">Logout</button>
  <p>
  <?php 
    if (isset($_SESSION['user_id'])) {
      echo "already logged in with {$_SESSION['user_id']}";
    }
  ?>
  </p>
  <p id="result">
  <?php
    if (isset($_REQUEST['user_id'])) {
      $_SESSION['user_id'] = $_REQUEST['user_id'];  
      $sql = "SELECT * FROM users WHERE id='{$_REQUEST['user_id']}'";
      $res = $mysqli->query($sql);
      $res->data_seek(0); // seek result pointer to start
      $reply = array();
      while ($row = $res->fetch_assoc()) {
        $reply = $row;
      }
      $res->close();
      echo "logged in as {$reply['name']}";
    } else {
      unset($_SESSION['user_id']);
    }
  ?>
  </p>
</body>
</html>