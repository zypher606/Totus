<?php
  session_start();
  include_once('db_connect.php');
  

  $request_id = $_REQUEST['request_id'];
  $_SESSION['redirect'] = "view_listing.php&request_id=$request_id";
  $user_id = $_SESSION['user_id'];
  $sql = "SELECT x.id as id,request_id,student_id,tutor_id,x.points as points,level,name,rating,num_ratings FROM request_options as x JOIN users as y ON x.tutor_id = y.id WHERE request_id='$request_id' AND (student_id='$user_id' OR tutor_id='$user_id')";
//  echo $sql;
  $res = $mysqli->query($sql);
  $res->data_seek(0); // seek result pointer to start
  $data = array();
  while($row = $res->fetch_assoc()) {
    $data[] = $row;
  }
  $res->close();
  if (current($data)['student_id'] == $user_id) {
    $status = 'student';
  } elseif (current($data)['tutor_id'] == $user_id) {
    $status = 'tutor';
  } else {
    $status = 'invalid';
  }
  
//  echo "I am $status";

?>
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
  <link rel="stylesheet" type="text/css" href="../Dashboard/css/main.css">
  <!-- Compiled and minified JavaScript -->
  <style type="text/css">
    .request-option[option-selected=true] {
      background-color: lightgray;
    }
  </style>
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
        <form class="col s12" method="get" action="accept_option.php">
            <h4 class="center-align tab-header">CLAIMS</h4>
          <?php if ($status == 'student') { ?>
            <ul>
            <?php foreach($data as $i=>$option) { ?>
              <li class="card-list-items request-option" onclick="select(<?php echo $i;?>)" data-request-id="<?php echo $option['request_id']?>"
               data-option-id="<?php echo $option['id']?>" data-level="<?php echo $option['level'] ?>">
		   		<div class="row">
		   			<div class="col s9">
		   				<h4>Points: <?php echo $option['points'] ?></h4>
                        <h5>Level: <?php echo $option['level'] ?></h5>
		   				
		   				<div class="row">
				            <div class="col s2" style="background: #26a69a; height: 40px; width: 40px; border-radius: 50%; line-height: 46px; color: #fff;">
				            	<i class="large material-icons" style="font-size: 19px;">perm_identity</i>
			            	</div>
				                 
			                 <div class="col s6" style="height: 46px; line-height: 41px;font-size: 19px;font-weight: 500;">
			                   <?php echo $option['name'] ?>
                             </div>
			            </div>
		   			</div>
		   		</div> 
		     </li> 
          <?php } ?>
          </ul>
          <?php } elseif ($status == 'tutor') { ?>
             <p>tutor</p>    
          <?php } else {?>
            <p>invalid</p> 
          <?php } ?>
          
          <button class="btn-large waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
          <input id="request_id" type="hidden" name="request_id">
          <input id="option_id" type="hidden" name="option_id">
          <input id="level" type="hidden" name="level">
        </form>
    </div>  
	
  <!--JS SCRIPTS  -->
  <script  src="https://code.jquery.com/jquery-2.2.4.min.js"  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
  <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB1VkUDYOytbWF67w9U3yjny-8IOUVe7JA&sensor=false"></script>
  <script type="text/javascript">
      selected_option = 0;
      function select(n) {
        selected_option = n;
        $('.request-option').attr('option-selected',false);
        $('.request-option').eq(n).attr('option-selected',true);
      }
      $(document).ready(function() {
        $('form').submit(function(e){
          var sel = $('.request-option[option-selected=true]');
          $('#request_id').val(sel.data('request-id'));
          $('#option_id').val(sel.data('option-id'));
          $('#level').val(sel.data('level'));
        });
      });
    </script>   
</body>
</html>