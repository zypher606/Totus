<?php
  session_start();
  include_once('db_connect.php');

/* requires lat,lng,time,skills,description */
  $_SESSION['redirect'] = "request_landing.php";
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
    <form class="col s12" method="get" action="create_request.php">
      <div class="row">
        <div class="users-map col s12">
          <div id="map-inject" style="width:100%; height:100%; z-index: 0;"></div>
        </div>
        <input id="lat" name="lat" type="hidden" value="23.1904058">
        <input id="lng" name="lng" type="hidden" value="72.6328568">
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
      var d = new Date($('#date').val() + ' ' + $('#time').val());
      $('input[name=time]').val(d.getTime()/1000);
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
  var myOptions;
  function initialize() {
      myOptions = {
          center: new google.maps.LatLng(23.1904058,72.6328568)
          , zoom: 11
          , mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map-inject"), myOptions);
    // Place a draggable marker on the map
var marker = new google.maps.Marker({
    position: new google.maps.LatLng(23.1904058,72.6328568),
    map: map,
    draggable:true,
    title:"Choose location"
});

//get marker position and store in hidden input
google.maps.event.addListener(marker, 'dragend', function (evt) {
    $('#lat').val(evt.latLng.lat().toFixed(7));
    $('#lng').val(evt.latLng.lng().toFixed(7));
});
  }
  initialize();
  </script>   
</body>
</html>