var app= angular.module('myApp', ['toaster']);
var app1 = app.filter('trusted', ['$sce', function($sce) {
			return function(str) {
				return $sce.trustAsHtml(str);
			};
}]);





app1.controller('dashboardController', function($scope, $http, $sce, $timeout, toaster ){


    $scope.focusMap = function(n) {
        
    	// map.setCenter(new google.maps.LatLng(23.923036, 71.259052));
    	console.log(n);
    	zoomFluid = map.getZoom();
        var marker = locations[n];
        console.log('moving to', marker.lat, marker.lng);
    	map.panTo({lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)});
    	// map.setZoom(12);
    	zoomTo(); 

    };








    $scope.getTab = function () {
			          return './views/users_listing.html';
			      }//Loading the respective page	

	$scope.listUser = function() 
    {
       $scope.tabShowfx = false;
		

		
      
      $scope.loading = true;  //Loading gif
      
      $http.get("../app/fetch_listings.php").success(function(response){

      		app.listings = response;
          	$scope.listings = response;
          	locations = app.listings;

      })
          .catch(function (err) {
              $scope.loading = false;
              $scope.conn_error=true;
              console.log('error');
          })

          .finally(function () {
              // Hide loading spinner whether our call
              $timeout(function(){

              	
                  $scope.loading = false;
                  $scope.tabShowfx = true;
                  initialize(locations);
              }, 400);
              console.log('finally');
          });
			
	};//Job search tab click fxn end





	

	// $('')

	/*******************************************************************/
	/*			           NOTIFICATIONS                               */
	/*******************************************************************/





	$scope.splitCommas = function(myArg){
		return (myArg).split(',');
	}

	$scope.getDate = function(argTimestamp){
		var date = new Date(argTimestamp);
		var n = date.getHours();
		var o = date.getMinutes();
		return n + ':' + o + ' - ' + (n+1) + ':' + o;
	}











	/************************************************************************/
	/*      Job details table call                                          */
	/************************************************************************/
	$scope.jobDetails = function(index) 
	{
		$scope.tabShowfx = false;
	
		$scope.selected_job_topic = index; // Set the selected order key
	
		$scope.getTab = function () {
			return '../Writers/jobDetails';
		}//Loading the respective page
		
		$scope.conn_error=false; //Error message
		$scope.loading = true;  //Loading gif
		$http.get("../order_details/jobsearch.json").success(function(response){
			$scope.job_detail_list = response.OrderDetails;
			$scope.jobwordArray = response.OrderTypeDetail;
			
		})
			.catch(function (err) {
				$scope.loading = false;
  				$scope.conn_error=true;
			})
			
			.finally(function () {
				// Hide loading spinner whether our call
				$timeout(function(){
					$scope.loading = false;
					$scope.tabShowfx = true;
				}, 300);
			});
	};//Job detail tab click fxn end








	$scope.listUser();
                              	                         
});




console.log('hello again');
var locations;
// console.log('real',locations);
var myOptions;
function initialize(locationPara) {
    myOptions = {
        center: new google.maps.LatLng(33.890542, 151.274856)
        , zoom: 11
        , mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-inject"), myOptions);
    app.gmap = map;
    console.log(locationPara);
    setMarkers(map, locationPara);

}


function setMarkers(map, locations) {
    console.log("setting");
    var marker, i;
    for (i = 0; i < locations.length; i++) {
        var loc = locations[i];
        latlngset = new google.maps.LatLng(parseFloat(loc.lat), parseFloat(loc.lng));
        var icon = {
            path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0"
            , text: 'xx'
            , fillColor: '#11a339'
            , fillOpacity: 1
            , anchor: new google.maps.Point(0, 0)
            , strokeWeight: 0
            , scale: .7
        };
        var marker = new google.maps.Marker({
            map: map
            , title: loc.title
            , position: latlngset
            , icon: icon
        });
        map.setCenter(marker.getPosition());
        // var content = '<h3>'+loc.title+'</h3>'+'<p>'+loc.description+'</p>';



        function getDateJS(argTimestamp){
			var date = new Date(argTimestamp);
			var n = date.getHours();
			var o = date.getMinutes();
			return n + ':' + o + ' - ' + (n+1) + ':' + o;
		};


        var content = '<div class="locationTooltip" style=" width: 300px; height: 190px;">'+
			              '<a href="../app/claim_landing.php?request_id='+loc.id+'&student_id='+loc.student_id+'" class="waves-effect waves-light btn" style="position: absolute;right: 0;bottom: 39px;z-index: 100000;font-size: 16px;">claim</a>'+
			              '<div class="row">'+
			                  '<h5 style="font-weight: 400;margin-bottom: -7px;font-size: 20px;">'+ loc.title + '</h3>'+
			                  '<p style="font-size: 14px; font-weight: 300;"><i class="material-icons" style="font-size: 11px;">schedule</i> ' + getDateJS(loc.time) +'</p>'+
			                  '<p class="truncate">'+ loc.description +'</p>' +
			              '</div>'+

			               '<div class="row">'+
			                   '<div class="col s2" style="background: #26a69a; height: 40px; width: 40px; border-radius: 50%; line-height: 46px; color: #fff;"><i class="large material-icons" style="font-size: 19px;">perm_identity</i></div>'+
			                   '<div class="col s6" style="height: 46px; line-height: 41px;font-size: 19px;font-weight: 500;">' + loc.name + '</div>'+
			              '</div>'+   
			         '</div>';



        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
            return function () {
                $('.locationTooltip').parents('.gm-style-iw').parent().hide();
                infowindow.setContent(content);
                infowindow.open(map, marker);
            };
        })(marker, content, infowindow));
        google.maps.event.addListener(map, "click", function(event) {
            infowindow.close();
        });
    }
}

    


