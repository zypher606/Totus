<?php
  
  /* 
   * Connects to a MySQL database. Edit parameters in the beginning
   * to set different connection settings
   */ 

  $db_host     = 'localhost';
  $db_user     = 'root';
  $db_password = 'chroot';
  $db_name     = 'redef_hack';

  $mysqli = new mysqli($db_host, $db_user, $db_password, $db_name);
  if ($mysqli->connect_errno > 0) {
    die("Unable to connect to database [{$mysqli->connect_error}]");
  }

  function insert_input($table, $fields) {
    $keys = explode(",",$fields);
    $values = array();
    foreach ($keys as $key) {
      $values[] = $_REQUEST[$key];
    }
    $values = implode("','", $values);
    return "INSERT INTO $table ($fields) VALUES ('$values');";
  }

?>