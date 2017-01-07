<?php
  session_start();
  include_once('db_connect.php');

/* requires lat,lng,time,skills,description */
  //$_SESSION['redirect'] = "claim_landing.php?request_id={$_REQUEST['request_id']}&student_id={$_REQUEST['student_id']}";
?>
<!DOCTYPE html>
<html>
<head>
  <title>Request Lesson</title>
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
  <link rel="stylesheet" type="text/css" href="../Dashboard/css/main.css">
  <!-- Compiled and minified JavaScript -->
</head>

<body>
  
  <div class="row">
    <form class="col s12" method="get" action="create_request.php">
      <div class="row">
        Map input
        <input type="hidden" name="lat">
        <input name="lng" type="hidden">
      </div>
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">label_outline</i>
          <input id="title" name="title" type="text" class="validate" required>
          <label for="title">Title</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">trending_up</i>
          <div class="chips"></div>
          <label id="chips-error" style="color:#f80a0a;">Please select at least one skill</label>
        </div>
        <input name="skills" type="hidden" required>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">schedule</i>
          <input id="time" placeholder="Time of lesson" type="time" required>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">today</i>
          <input id="date" placeholder="Date of lesson" type="date" class="datepicker" required>
        </div>
        <input name="time" type="hidden">
      </div>
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">subject</i>
          <textarea id="description" name="description" class="materialize-textarea" required></textarea>
          <label for="textarea1">Description</label>
        </div>
      </div>
      <button class="btn-large waves-effect waves-light" type="submit" name="action">Submit Request
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>  
	
  <!--JS SCRIPTS  -->
  <script  src="https://code.jquery.com/jquery-2.2.4.min.js"  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
  <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB1VkUDYOytbWF67w9U3yjny-8IOUVe7JA&sensor=false"></script>
  <script type="text/javascript">
  $('document').ready(function() {
    $('#chips-error').hide();
    $('.datepicker').pickadate({selectMonths: true, selectYears: false, selectTime: true});
    $('.chips').material_chip();
    $('form').submit(function(e) {
      $('input[name=lat]').val('23.1964262');
      $('input[name=lng]').val('23.1964262');
      var d = new Date($('#date').val() + ' ' + $('#time').val());
      $('input[name=time]').val(d.getTime());
      if ($('.chips').material_chip('data').length) {
        $('input[name=skills]').val($('.chips').material_chip('data').map(function(a){return a.tag;}).join(","));
      } else {
        e.preventDefault(e);
//        alert('Please select at least one skill');
        $('#chips-error').show();
        window.setTimeout(function() {$('#chips-error').fadeOut();  }, 2000);
      }
      alert($('form').serialize());
    });
  });
  </script>   
</body>
</html>