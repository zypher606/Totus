<?php

  include_once('db_connect.php');

  if (isset($_REQUEST['query'])) {
    $sql = $_REQUEST['query'];
    $res = $mysqli->query($sql);
    $res->data_seek(0); // seek result pointer to start
    $reply = array();
    while ($row = $res->fetch_assoc()) {
      $reply[] = $row;
    }
    $res->close();
  }

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SQL executer</title>
</head>
<body>
  <form action="#" method="post">
    <input type="text" name="query" placeholder="SQL Query" style="width:80%">
    <input type="submit" value="Submit Query">
  </form>
  <p id="result">
    <?php 
      if (isset($_REQUEST['query'])) {
        echo json_encode($reply);
      } else {
        echo "No data received";
      }
    ?>
  </p>
</body>
</html>