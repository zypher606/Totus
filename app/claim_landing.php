<?php
  session_start();
  include_once('db_connect.php');

// requires request_id, student_id
  $_SESSION['redirect'] = "claim_landing.php?request_id={$_REQUEST['request_id']}&student_id={$_REQUEST['student_id']}";
?>
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
  <link rel="stylesheet" type="text/css" href="../Dashboard/css/main.css">
  <!-- Compiled and minified JavaScript -->
</head>

<body>

    <div class='header center-align'>
        <div class="title">TOTUS</div>
    </div>
    <div class="mytoolbar fixed-action-btn toolbar">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">menu</i>
        </a>
        <ul>
            <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">insert_chart</i></a></li>
            <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">format_quote</i></a></li>
            <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">publish</i></a></li>
            <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">attach_file</i></a></li>
        </ul>
    </div>

    <div class="gap40"></div>
    <div class="gap40"></div>
  



    <div class="row claim-section">
        <form class="col s12" method="get" action="send_quotation.php">
            <h4 class="center-align tab-header">CLAIM</h4>
          <input name="request_id" hidden="true"
          <?php
            echo "value={$_REQUEST['request_id']}"
          ?>>
          <input name="student_id" hidden="true"
          <?php
            echo "value={$_REQUEST['student_id']}"
          ?>>
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">play_for_work</i>
              <input id="points" name="points" type="number" min="0" step="1" class="validate" required>
              <label for="points" data-error="Points must be a number larger than 0">Points</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">trending_up</i>
              <input id="last_name" name="level" type="number" min="1" step="1" max="5" class="validate" required>
              <label for="last_name" data-error="Dificulty must be a number between 1 and 5">Difficulty</label>
            </div>
          </div>
          <button class="btn-large waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
    </div>  
	
  <!--JS SCRIPTS  -->
  <script  src="https://code.jquery.com/jquery-2.2.4.min.js"  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
  <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB1VkUDYOytbWF67w9U3yjny-8IOUVe7JA&sensor=false"></script>
          
</body>
</html>