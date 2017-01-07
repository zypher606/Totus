var app= angular.module('myApp', ['toaster']);
var app1 = app.filter('trusted', ['$sce', function($sce) {
			return function(str) {
				return $sce.trustAsHtml(str);
			};
}]);







app1.controller('dashboardController', function($scope, $http, $sce, $timeout, toaster ){


    $scope.focusMap = function(n) {
        
    	// map.setCenter(new google.maps.LatLng(23.923036, 71.259052));

    	zoomFluid = map.getZoom();
        var marker = locations[n];
        console.log('moving to', marker.lat, marker.lng);
    	map.panTo({lat: 0.1+parseFloat(marker.lat), lng: -0.1+parseFloat(marker.lng)});
    	// map.setZoom(12);
    	zoomTo(); 

    }
	//EVENTS STARTS FROM HERE
	/************************************************************************/
	/*      Jobsearch page call                                             */
	/************************************************************************/
	$scope.listUser = function() 
    {
       $scope.tabShowfx = false;
		
      $scope.getTab = function () {
          return './views/users_listing.html';
      }//Loading the respective page
      $scope.loading = true;  //Loading gif
      
      $http.get("../app/fetch_listings.php").success(function(response){
          $scope.listings = response;
          console.log("loaded data");
          console.log($scope.listings);
          app.listings = response;
          console.log('hello');
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
              }, 300);
              console.log('finally');
          });
			
	};//Job search tab click fxn end



	$scope.listUser();

	// $('')

	/*******************************************************************/
	/*			           NOTIFICATIONS                               */
	/*******************************************************************/





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


	/************************************************************************/
	/*      Payment tab click function                                      */
	/************************************************************************/
	$scope.payment = function()
	{
		$scope.tabShowfx = false;
	
		$scope.getTab = function () {
			return '../Writers/payment';
		}//Loading the respective page
		
		$scope.conn_error=false; //Error message
		$scope.loading = true;  //Loading gif
		$http.get("../WriterBankdetails/balanceBankinfo.json").success(function(response){
			
			$scope.balanceBankDetail = response.BankAndBalanceInfo;
			
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
		
		
	}//payment tab end
	







	//Profile function
	$scope.profile = function()
	{
		$scope.tabShowfx = false;
		$scope.conn_error=false; //Error message
		$scope.loading = true;  //Loading gif
		
		var updateTime = Date.now();

		$http.get("../WriterCredits/credit.json").success(function(response){
			
			$scope.user_credits = response.WriterCredit;
		})
			.catch(function (err) {
				$scope.loading = false;
  				$scope.conn_error=true;
			})
			
			.finally(function () {
				// Hide loading spinner whether our call

				$scope.getTab = function () {
					return '../Writers/profile?updated='+updateTime;
				};//Loading the respective page

				getWriterDetails();
		});



		var getWriterDetails = function() {
			$http.get("../Writers/writerPersonalDetails").success(function(personalDetails){
				
				$scope.writerDetails = personalDetails.Writer;

				//FUNCTION CALLING PROFILE PIC
				$scope.getProfilePic = personalDetails.Writer.profile_pic + '?updated='+updateTime;
			
				
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
					}, 400);
			});
		}

			//INITIATING PROFILE PIC UPLOAD
			writerpicuploader();

			

	};//Profile function end


	$scope.portfolio = function () {
		$scope.tabShowfx = false;
		$scope.conn_error=false; //Error message
		$scope.loading = true;  //Loading gif
		
		var updateTime = Date.now();

		$http.get("../WriterCredits/credit.json").success(function(response){
			
			$scope.user_credits = response.WriterCredit;
		})
			.catch(function (err) {
				$scope.loading = false;
  				$scope.conn_error=true;
			})
			
			.finally(function () {
				// Hide loading spinner whether our call

				$scope.getTab = function () {
					return '../Writers/portfolio?updated='+updateTime;
				};//Loading the respective page

				getWriterDetails();
		});


			$http.get("../Writers/fetchPortfolioData.json").success(function (response) {
				$scope.portfolioData = response;
				// console.log($scope.portfolioData);
			});


		var getWriterDetails = function() {
			$http.get("../Writers/writerPersonalDetails").success(function(personalDetails){
				
				$scope.writerDetails = personalDetails.Writer;
				// console.log($scope.writerDetails);

				//FUNCTION CALLING PROFILE PIC
				$scope.getProfilePic = personalDetails.Writer.profile_pic + '?updated='+updateTime;
			
				
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
					}, 400);
			});
		}

			//INITIATING PROFILE PIC UPLOAD
			writerpicuploader();
			// uploadCertificate();

			
	}






	//LOAD NEW PROFILE PIC IF NEW UPLOADED
	$scope.loadProfilePicUploadWatch = function() {
		//WATCH FUNCTION TO CHECK IF FILE IS SUCCESSFULLY UPLOADED
       	$scope.$watch(
			function () {
				if ($scope.picUploader.queue.length == 1) {
					return $scope.picUploader.queue[0].isSuccess;
				}
				else {
					return false;
				}	
			},

			function(val){
		    	if(val){
			       //I will run next line of codes
			       $http.get("../Writers/writerPersonalDetails").success(function(personalDetails){

			       		var updateTime = Date.now();
						//FUNCTION CALLING PROFILE PIC
						$scope.getProfilePic = personalDetails.Writer.profile_pic + '?updated='+updateTime;

					});
		    	}
			}, true);
		    
	};















	//Claimed project page call list
	$scope.claimedProjects = function() 
	{
		$scope.tabShowfx = false;
		$scope.getTab = function () {
			return '../Writers/claimedProjects';
		}//Loading the respective page
		
		$scope.conn_error=false; //Error message
		$scope.loading = true;  //Loading gif
		
		$http.get("../WriterClaims/recentClaims.json").success(function(response){
			
			
			$scope.claimedProjectStatus = response.claimedProjects;
			$scope.claimedProjectDetails = response.ProjectDetails;
			
			

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
		
			
	};//Claimed projects list tab click fxn end





	//Content sample submit for skill upgrade
	$scope.contentSampleSubmit = function() 
	{
		$scope.tabShowfx = false;
		$scope.loading = true;
		$scope.skillUpgradeLoad = function () {
			return '../Writers/contentSample';
		};//Loading the respective page
		
		$scope.loading = false;
		$scope.tabShowfx = true;

			
	};//Content sample submit for skill upgrade



	//Project submission page call
	$scope.projectSubmission = function(orderID, claimedID) 
		{
			$scope.tabShowfx = false;
			var updateTime = Date.now();
			// $scope.selected_job_topic = index; // Set the selected order key
		
			$scope.getTab = function () {
				return '../Writers/projectSubmission?updated='+updateTime;
			}//Loading the respective page
			
			$scope.conn_error=false; //Error message
			$scope.loading = true;  //Loading gif
			$http.get("../WriterClaims/selectedProjectDetails/"+orderID+"/"+claimedID).success(function(response){
				
				
				$scope.job_detail_list = response.OrderDetails;
				$scope.job_status = response.claimedProjects;
				$scope.writer_uploads = response.writerUploads;
				$scope.writer_corrections = response.WriterCorrection;
				$scope.projectDeadline = response.submission;
				$scope.projectStipend = response.OrderStipendArray;

				$scope.myrange = function(inputArray, maxL) {
					var mylist = [];
					for (var i = 0; i < maxL; i++) {
    					mylist.push(i);
					}
					return mylist;
				}
				
				
								
		/*=========================================*/
		/*       CALLING UPLOAD PLUGIN FINCTION    */
		/*=========================================*/
		
			mycustomFileUploader(orderID);
    
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
			
			
    	};//Project submission function end






	/*****************************************************************/
	/*                    Orderdetails empty field check             */
	/*****************************************************************/
	$scope.fieldEmptyCheck = function(fieldValue){
		if (fieldValue == ""){
			return "----";
		}
		return fieldValue;
	}

	
	
	
	//submitting form initialize
	$scope.submission = false;
	// Updated code thanks to Yotam
	var param = function(data) {
		var returnString = '';
		for (d in data){
			if (data.hasOwnProperty(d))
				returnString += d + '=' + data[d] + '&';
		}
		// Remove last ampersand and return
		return returnString.slice( 0, returnString.length - 1 );
	};
	
	//initialize end
	
	
	
	//function for different simple update forms
	function form_names(passvar)
	{
		switch (passvar)
			{
				case ('reference'):
					{
						window.dataVar = param($scope.writerDetails);
						return '../Writers/referencesUpdate';
						break;
				
					}
				case ('personalInfo'):
					{
						window.dataVar = param($scope.writerDetails);
						return '../Writers/personalInfoUpdate';
						break;
					}
				case ('balanceBankDetails'):
					{
						window.dataVar = param($scope.balanceBankDetail);
						return '../WriterBankdetails/bankdetailsUpdate';
						break;
					}
			}
	}//update switch end
	
	
	
	//form update code
	$scope.myformUpdate = function (formNamePass)
	{	
		toaster.clear();
		$http({
			method : 'POST',
			url : form_names(formNamePass),
			data : dataVar, // pass in data as strings
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 		// set the headers so angular passing info as form data (not request payload)
		})
			.success(function (response) {
			
			toaster.clear();    
			toaster.pop('success', "Update Successful", "");
			//success response part not working
		});
		toaster.pop('note', "Updating your data...", "");
	}//simple form update function ends
		
	
	
	
	//Function for claiming projects
	$scope.claimProject = function (projectID, paygrade, area)
	{
		toaster.clear();
		$http({
			method : 'POST',
			url : '../WriterClaims/claimProject',
			data : 'order_id='+projectID+'&paygrade='+paygrade+'&area='+area, // pass in data as strings
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 		// set the headers so angular passing info as form data (not request payload)
		})
			.success(function (response) {
			toaster.clear();
			if(response.status == 'success') {
				toaster.pop("success", "Verification email sent. Please check your spam folder.","");
			}
			toaster.pop(response.status, response.message, "");
		});
		toaster.pop('note', "Processing...", "");
	}//claiming function end
	
	
	
	
	//Skill upgrade area sample submit form load
	$scope.sampleSubmissionSelectArea = function(areaID){
		
		$scope.loading2 = true;
		$scope.loadAreasampleTopic = function () {
				return '../Writers/contentSampleTopics?areaID='+areaID;
			}
		$scope.area_id =  areaID;

	}//skill page load end
	
	

	$scope.NoOptionChecked = false;
	$scope.topicSelected = function(topic){
		$scope.NoOptionChecked = true;
		$scope.topic_id = topic;
	}
	
	//Sample text submit
	$scope.submitAreaSample = function (sample)
	{
		toaster.clear();
		if ($scope.NoOptionChecked){
			toaster.pop('note', "Processing...", "");
			$http({
				method : 'POST',
				url : '../Writers/submitAreaSample',
				data : 'area_id='+$scope.area_id +'&topic_id='+$scope.topic_id +'&sample='+sample, // pass in data as strings
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 				// set the headers so angular passing info as form data (not request payload)
			})
				.success(function (response) {
				//alert(response.status);
				toaster.clear();
				toaster.pop(response.status, response.message, "");
				//success response part not working
			});
		}
		
		else{
			
			toaster.pop("error", "Select a topic first", "");
		}
	
		
		
		
		
	};//sample submit function end
	
	
	
	/*===========================================================*/
	/*                ANGULAR FILE UPLOAD MODULE                 */
	/*            FUNCTION USED IN CLAIMED DETAILS PAGE CALL     */
	/*===========================================================*/
	
	
	var mycustomFileUploader = function(orderID){
		var uploader = $scope.uploader = new FileUploader({
            url: '../Writers/uploadFileWriter/' + orderID
        });

        // FILTERS

	
		uploader.filters.push({
			name: 'customFilter',
			fn: function(item /*{File|FileLikeObject}*/, options) {
				return this.queue.length < 1;
			}
		});
	};

 


	/*===========================================================*/
	/*                DATE FUNCTION                              */
	/*            FUNCTION USED ORDER REMAINING TIME             */
	/*===========================================================*/
	$scope.mydateDifference = function(currentTime, inputTime){
		var today = new Date(currentTime);
 		var orderedDay = new Date(inputTime);
 		var submitTimeMS = 96*60*60*1000; 
 		var diffMs = (orderedDay - today) + (96 * 60 * 60 *1000);



 		function convertMS(ms) {
  			var d, h, m, s;
  			s = Math.floor(ms / 1000);
  			m = Math.floor(s / 60);
  			s = s % 60;
  			h = Math.floor(m / 60);
  			m = m % 60;
  			d = Math.floor(h / 24);
  			h = h % 24;
  			return (d + " day, " + h + " hours, " + m + " minutes");
		};
 		
 		var requiredCutoffTimeMS = (36 * 60 * 60 * 1000);
 		if (diffMs < 0){
 			return 'Timeout';
 		} 
 		if (diffMs < requiredCutoffTimeMS) {
 			return convertMS(diffMs);
 		}
 		else{
 			return '36 hours';
 		}
 		
		
	}
















	/*==============================================================================*/
	/*             BLOCK WRITER TO ADD A NEW INDUSTRY IS CREDIT IN NOT ZERO         */
	/*==============================================================================*/
	$scope.blockExtraIndustryAdd = function(industry) {

		var creditArr = $scope.user_credits;
		// console.log(creditArr);
		for (i = 0; i < creditArr.length; i++ ) {
			if (creditArr[i].area == industry) {
				if ((creditArr[i].xp) > 0) {
					// console.log('as');
					return true;
				}
				else {
					// console.log('false');
					return false;
				}
			}
		}
	};














	$scope.notification = function(){
		// $scope.loading = true;
		var pageVar = "../Writers/notifications";
		var updateTime = Date.now();
		// async: true
	
		$scope.tabShowfx = false;
		$scope.getTab = function () {
				return "../Writers/notifications?updated=" + updateTime;
			}; //Loading the respective page

		$scope.conn_error = false; //Error message
		$scope.loading = true; //Loading gif

		$http.get("../Writers/notificationData").success(function (response) {

				$scope.notifications = response.notifications;
				console.log(response);
			})
			.catch(function (err) {
				$scope.loading = false;
				$scope.conn_error = true;
			})

		.finally(function () {
			// Hide loading spinner whether our call
			$timeout(function(){
				$scope.loading = false;
				$scope.tabShowfx = true;


			}, 300);
			

		});

	};



	// Notification status change
	$scope.notificationDetails = function(index,data){
		$("#notification_list").hide(300);
        $("#notification_info").show(300);
        $scope.notificationIndex = index;
		$http({
			method: 'POST',
			url: '../Writers/notificationStatus',
			data: param(data),
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function() {
			$scope.getNotificationCount();
		});
	};

	
	// Notification Delete
	$scope.notificationDelete = function(index,data){
		$http({
			method:'POST',
			url: '../Writers/notificationDelete',
			data: param(data),
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(){
			$scope.notification();
			$scope.getNotificationCount();
			toaster.pop("error", "Record Deleted.", "");
		});
	}



	/********************************************************/
	/*                 writer Community                     */
	/********************************************************/

	$scope.WriterCommunity = function() {
		var updatetime = Date.now();
		$scope.tabShowfx = false;
		$scope.getTab = function() {
			return "../Writers/community?updated=" + updatetime;
		};
		$scope.conn_error = false;
		$scope.loading = true;
		$scope.queryLimitEnd = false;
		window.queryLimit = 1; // number of post which we want to show in one time

		$http.get("../Writers/getPostdata/" + queryLimit + "/0").success(function (response) {
				$scope.Postdata = response.posts;
				window.queryoffset = response.nextOffset;
			})
			.catch(function (err) {
				$scope.loading = false;
				$scope.conn_error = true;
			})

		.finally(function () {
			$timeout(function(){
				$scope.loading = false;
				$scope.tabShowfx = true;
			}, 300);
		});
	}

	$scope.PostListMore = function() {
		$http.get("../Writers/getPostdata/" + queryLimit + "/" + queryoffset).success(function (response) {
				var oldList = $scope.Postdata;
				$scope.Postdata = oldList.concat(response.posts);
				window.queryoffset = response.nextOffset;
				$scope.queryLimitEnd = response.QueryEnd;
			})
			.catch(function (err) {
				$scope.loading = false;
				$scope.conn_error = true;
			})

		.finally(function () {
				$scope.loading = false;
		});
	}

	$scope.searchBar = function(keyword) {
		var updatetime = Date.now();
		$scope.tabShowfx = false;
		$scope.getTab = function() {
			return "../Writers/communitySearch?updated=" + updatetime;
		};
		$scope.conn_error = false;
		$scope.loading = true;


		var keyword = {
			'key' : keyword
		}
		$http({
			method : 'POST',
			url    : '../Writers/searchBar',
			data   : param(keyword),
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function (response){
			$scope.Postdata = response.posts;
			console.log($scope.Postdata);
		}).finally(function () {
			$timeout(function(){
				$scope.loading = false;
				$scope.tabShowfx = true;
			}, 300);
		});
	}

	$scope.retriveTags = function() {
		$http.get("../Writers/retriveTags").success(function (response) {
			$scope.IndustryTag = response;
		});
	}

	$scope.generatePost = function() {
		var updatetime = Date.now();
		$scope.tabShowfx = false;
		$scope.getTab = function() {
			return "../Writers/createPost?updated=" + updatetime;
		};
		$scope.error = false;
		$scope.loading = true;
		$scope.check = {
			box1 : false,
			box2 : false,
			box3 : false
		}
		$timeout(function(){
				$scope.retriveTags();
			$scope.toolbar();
			$scope.loading = false;
			$scope.tabShowfx = true;
		}, 300);
	}

	$scope.toolbar = function() {
		  var toolbaroption = [
	 		['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                // [ 'link' ],          // add's image support
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                // [{ 'font': [] }],
                [{ 'align': [] }],

                // ['clean']     
          ];

		  window.quill = new Quill('#editor', {
		    modules: {
					    toolbar: toolbaroption
					  },

			  placeholder: 'Compose an epic...',
			  theme: 'snow' 
		  });
	}

	$scope.validationPost = function (title , id , tags, discription , postType) {
		var post = $('.ql-editor').html();
			if(!title){
				toaster.pop('warning', "Enter Title");
			}else if(!discription) {
				toaster.pop('error' , "Enter excerpt");
			}else if(post == "<p><br></p>") {
				toaster.pop('error' , "Enter Post");
			}else if(!tags) {
				toaster.pop('error' , "Enter Tags");
			}else if (!id){
				toaster.pop('error' , "Choose Post category");
			}else if(!postType){
				toaster.pop('error' , "Choose Post Type");
			}
			else {
					$scope.savePost(title , id , post , tags, discription , postType);
			}
	}

//if you enable licence option pass check in side function
	$scope.savePost = function(title , id , post ,tags, discription , postType) {
		// var post = window.quill.innerHTML();
		// var post = $('.ql-editor').html();
		// if(!id){
		// 	toaster.pop('success', "choose post type");
		// }else{
		// 	if(check.box1 == true && check.box2 == false && check.box3 == false){
		// 		var post = {
		// 			'tags' 		  : tags,
		// 			'discription' : discription,
		// 			'post' 		  : post,
		// 			'title' 	  : title,
		// 			'industry_id' : id,
		// 			'licence' 	  : "Attribution-NoDerivatives 4.0 International"
		// 		}
		// 		savePostdata(post);
		// 	}else if(check.box1 == true && check.box2 == true && check.box3 == false){
		// 		var post = {
		// 			'tags' 		  : tags,
		// 			'discription' : discription,
		// 			'post' 		  : post,
		// 			'title' 	  : title,
		// 			'industry_id' : id,
		// 			'licence' 	  : "Attribution 4.0 International"
		// 		}
		// 		savePostdata(post);
		// 	}else if(check.box1 == true && check.box2 == true && check.box3 == true){
		// 		var post = {
		// 			'tags' 		  : tags,
		// 			'discription' : discription,
		// 			'post' 		  : post,
		// 			'title' 	  : title,
		// 			'industry_id' : id,
		// 			'licence' 	  : "Attribution-ShareAlike 4.0 International"
		// 		}
		// 		savePostdata(post);
		// 	}else if(check.box1 == false && check.box2 == true && check.box3 == false){
		// 		var post = {
		// 			'tags' 		  : tags,
		// 			'discription' : discription,
		// 			'post' 		  : post,
		// 			'title' 	  : title,
		// 			'industry_id' : id,
		// 			'licence' 	  : "Attribution-NonCommercial 4.0 International"
		// 		}
		// 		savePostdata(post);
		// 	}else if(check.box1 == false && check.box2 == true && check.box3 == true){
		// 		var post = {
		// 			'tags' 		  : tags,
		// 			'discription' : discription,
		// 			'post' 		  : post,
		// 			'title' 	  : title,
		// 			'industry_id' : id,
		// 			'licence' 	  : "Attribution-NonCommercial-ShareAlike 4.0 International"
		// 		}
		// 		savePostdata(post);
		// 	}else{
		// 		toaster.pop('success', "check licences");
		// 	}
		// }

		var post = {
					'tags' 		  : tags,
					'discription' : discription,
					'post' 		  : post,
					'title' 	  : title,
					'type_of_post': postType,
					'industry_id' : id
					// 'licence' 	  : "Attribution-NonCommercial-ShareAlike 4.0 International"
				}
				savePostdata(post);
				console.log(post);
		function savePostdata(post) {
			post = param(post);
			$http({
				method: 'POST',
				url: "../Writers/savePost",
				data: post,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function() {
				toaster.pop('success','your artical has been published');
				$scope.WriterCommunity();
			});
		}
	}


	$scope.postDetails = function(id) {
		var updatetime = Date.now();
		$scope.selectedpostid = id;
		$scope.tabShowfx = false;
		$scope.getTab = function() {
			return "../Writers/detailpost?updated=" + updatetime;
		};
		$scope.error = false;
		$scope.loading = true;
		var id1 = {
			'id' : id
		}
		id1 = param(id1)
		$http({
			method: 'POST',
			url: '../Writers/detailpostdata',
			data: id1,
			headers:{
				'Content-Type' : 'application/x-www-form-urlencoded'				
			}
		}).success(function(response) {
			$scope.detailpost = response.CommunityPost;
			$scope.currentUser = response.Cid;
			$scope.comments = response.comment.comments;
			$scope.detail = response;
		})

		.finally(function () {
			$timeout(function(){
				// document.getElementById(pdetails);
				$scope.loading = false;
				$scope.tabShowfx = true;
			}, 300);
		});
	}


	$scope.openreplybox = function(id){
		// console.log(id);
		var edit = angular.element(document.querySelector('#'+id));
		edit.removeClass('hide');
		edit.css("disply : block");
		edit.addClass('visible');
	}

	$scope.closereplybox = function(id){
		var edit = angular.element(document.querySelector('#'+id));
		edit.removeClass('hide');
		edit.addClass('visible');
	}


	$scope.editPost = function (id) {
		var updatetime = Date.now();
		$scope.selectedpostid = id;
		$scope.tabShowfx = false;
		$scope.getTab = function() {
			return "../Writers/editPost?updated=" + updatetime;
		};
		$scope.error = false;
		$scope.loading = true;
		var id1 = {
			'id' : id
		}
		id1 = param(id1)
		$http({
			method: 'POST',
			url: '../Writers/detailpostdata',
			data: id1,
			headers:{
				'Content-Type' : 'application/x-www-form-urlencoded'				
			}
		}).success(function(response) {
			$scope.detail = response;
			console.log($scope.detail);
		})

		.finally(function () {
			$timeout(function(){
				$scope.retriveTags();
				$scope.toolbar();
				$scope.loading = false;
				$scope.tabShowfx = true;
			}, 300);
		});
	}

	$scope.validationPostUpdate = function (title , industryid , uid , pid , tags , discription) {
		var post = $('.ql-editor').html();
		if(!title){
			toaster.pop('warning', "Enter Title");
		}else if(!discription) {
			console.log(discription);
			toaster.pop('error' , "Enter excerpt");
		}else if(post == "<p><br></p>") {
			toaster.pop('error' , "Enter Post");
		}else if(!tags) {
			toaster.pop('error' , "Enter Tags");
		}else if (!pid){
			toaster.pop('error' , "Choose Post Type");
		}else {
			$scope.updatePost(title , industryid , uid , pid , tags , discription , post);
		}
	}

	$scope.updatePost = function (title , industryid , uid , pid , tags , discription , post) {
		// var post = $('.ql-editor').html();
		var post = {
			'tags' 		  : tags,
			'discription' : discription,
			'id' : pid,
			'postUserId' : uid,
			'post' : post,
			'title' : title,
			'industry_id' : industryid
			// 'licence' : licence
		}

		post = param(post);
			$http({
				method: 'POST',
				url: "../Writers/updatePost",
				data: post,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function() {
				toaster.pop('success','your artical has been published');
				$scope.WriterCommunity();
			});
	}

	$scope.deletepost = function(id) {
		var id1 = {
			'id' : id
		}
		id1 = param(id1)
		$http({
			method:'POST',
			url: '../Writers/deletepost',
			data: id1,
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(){
			$scope.WriterCommunity();
			toaster.pop("error", "Record Deleted.", "");
		});
	}

	$scope.makecomment = function(pid , comment , postuserid) {
		if(!pid || !comment || !postuserid){
			toaster.pop('error' , "Invalid Comment");
		}else{
			var data = {
				'pid': pid,
				'comment':comment,
				'postuserid':postuserid
			}
			data = param(data);
			$http({
				method : 'POST',
				url : '../Writers/makecomment',
				data : data,
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).success(function() {
				$scope.retriveComment(pid);
				var show = angular.element(document.querySelector('.commentBox'));
				show.val("");
				toaster.pop('success', 'comment posted');
			});
		}
	}

	$scope.deleteComment = function (id ,commentId) {
		
		var id = {
			'id' : id,
			'cid' : commentId
		}
		console.log(id);
		$http({
			method : 'POST',
			url : '../Writers/deleteComment',
			data : param(id),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function (response) {
				$scope.comments = response.comments;
				$scope.detail.commentcount = response.commentcount;
				console.log(response);
			toaster.pop('success' , 'comment deleted');
			
		})
	}

	$scope.deleteReplyComment = function (id ,commentId) {
		
		var id = {
			'id' : id,
			'crid' : commentId
		}
		console.log(id);
		$http({
			method : 'POST',
			url : '../Writers/deleteCommentReply',
			data : param(id),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function (response) {
				$scope.comments = response.comments;
				$scope.detail.commentcount = response.commentcount;
				console.log(response);
			toaster.pop('success' , 'reply deleted');
			
		})
	}

	$scope.replytocomment = function(id ,cid , comment , commentuserid , reply_box_id) {
		if(!comment){
			toaster.pop('success' , 'Invalid reply');
		}else{
			var data = {
				'cid': cid,
				'rcomment':comment,
				'commentuserid':commentuserid
			};
			data = param(data);
			$http({
				method : 'POST',
				url : '../Writers/replytocomment',
				data : data,
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).success(function() {
				$scope.closereplybox(reply_box_id);
				$scope.retriveComment(id);
				toaster.pop('success', 'reply posted');
			});
		}
	}

	$scope.retriveComment = function (id) {
		var data = {
			'id' : id
		};
		data = param(data);
		$http({
			method : 'POST',
			url : '../Writers/retriveComment',
			data : data,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(response) {
			$scope.comments = response.comments;
			$scope.detail.commentcount = response.commentcount;
			console.log(response);
		});
	}

	$scope.likepost = function(id) {
		var pid = {
			'pid' : id
		}
		$http({
			method : 'POST',
			url : '../Writers/likepost',
			data : param(pid),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(response) {
			$scope.likecount(id);
		});
	}

	$scope.likecomment = function(id , postid) {
		var pid = {
			'cid' : id
		}
		$http({
			method : 'POST',
			url : '../Writers/likecomment',
			data : param(pid),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(response) {
			$scope.retriveComment(postid);
		});
	}
	// $scope.likecommentcount = function (id) {
	// 	var pid = {
	// 		'pid' : id
	// 	}
	// 	$http({
	// 		method : 'POST',
	// 		url : '../Writers/likecount',
	// 		data : param(pid),
	// 		headers : {
	// 			'Content-Type' : 'application/x-www-form-urlencoded'
	// 		}
	// 	}).success(function(response) {
	// 		$scope.comment.likecount = response;
	// 	});
	// }
	$scope.likecount = function(id) {
		var pid = {
			'pid' : id
		}
		$http({
			method : 'POST',
			url : '../Writers/likecount',
			data : param(pid),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(response) {
			$scope.detail.likecount = response;
		});
	}

	$scope.showcomment = function(id) {
		var id1 = {
			'id' : id
		}
		var config = {
			params: id1,
			headers : {'Accept' : 'application/json'}
		};
		$http.get("../Writers/showcomment.json",config).success(function(response) {
			console.log(response);
		})
	}


	
	$scope.reportModel = function(showclass , hideclass) {
     	var show = angular.element(document.querySelector('.'+showclass));
		show.removeClass('hide');
		show.addClass('visible');
		var edit = angular.element(document.querySelector('.'+hideclass));
		edit.removeClass('visible');
		edit.addClass('hide');  
	}

	$scope.reportPost = function(id , message) {
		var data = {
			'id' : id,
			'comment' : message
		}
		$http({
			method: 'POST',
			url : "../Writers/reportPost",
			data : param(data),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function () {
			toaster.pop('success' , 'Thank you for reporting post , we will see what we can.');
		})
	}

	$scope.detailuser = function(id) {
		// retrive portfolio here
		console.log(id);
	}


	/**************************************************************/
	/*                      portfolio                             */
	/**************************************************************/


	$scope.generalEdit = function($id){
		var show = angular.element(document.querySelector('.'+$id));
		show.removeClass('visible');
		show.addClass('hide');
		var edit = angular.element(document.querySelector('.'+$id+'_edit'));
		edit.removeClass('hide');
		edit.addClass('visible');
		if($id == 'genral_info_box'){
				if($scope.portfolioData.Writer.gender == 'female'){
					$scope.male = false;
					$scope.female = true;
				}else if($scope.portfolioData.Writer.gender == 'male'){
					$scope.male = true;
					$scope.female = false;
				}
		}
	}

	$scope.addNew = function(id) {
		console.log(id);
		var edit = angular.element(document.querySelector('.'+id+'_new'));
		edit.removeClass('hide');
		edit.addClass('visible');
	}
	$scope.cancelNew = function(id) {
		console.log(id);
		var edit = angular.element(document.querySelector('.'+id+'_new'));
		edit.removeClass('visible');
		edit.addClass('hide');
	}

	$scope.cancelEdit = function (id) {
		var show = angular.element(document.querySelector('.'+id));
		show.removeClass('hide');
		show.addClass('visible');
		var edit = angular.element(document.querySelector('.'+id+'_edit'));
		edit.removeClass('visible');
		edit.addClass('hide');
	}


	$scope.generalProfileSave = function(firstname, lastname, username, country, gender, state, city, pincode) {
			if(firstname.length < 3){
		   		toaster.pop('success' , "Invalid Firstname");
		   }else if(lastname.length < 3){
		   			toaster.pop('success' , "Invalid Lastname");
		   }else if(username.length < 3){
		   			toaster.pop('success' , "Invalid Username");
		   }else if(country.length < 3){
		   			toaster.pop('success' , "Invalid country");
		   }else if(!gender){
		   			toaster.pop('success' , "Invalid gender");
		   }else if(gender.length <	3){
		   			toaster.pop('success' , "Input Required");
		   }else if(state.length < 3){
		   			toaster.pop('success' , "Invalid state");
		   }else if(city.length < 3){
		   			toaster.pop('success' , "Invalid city");
		   }else if(pincode.length < 5){
		   			toaster.pop('success' , "Invalid pincode");
		   }
		   else{
				var data = {
					'firstname' : firstname,
					'lastname'  : lastname,
					'username'  : username,
					'country'   : country,
					'gender'    : gender,
					'state'     : state,
					'city'      : city,
					'pincode'   : pincode,
				};
				console.log(data);
				$http({
					method : 'POST',
					url    : '../Writers/generalProfileSave',
					data   : param(data),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).success(function () {
					$scope.getPortfolioData();
					$scope.cancelEdit('genral_info_box');
					toaster.pop('success' , "data save");
				});
			}
	}
	$scope.getPortfolioData  = function () {
		$http.get("../Writers/fetchPortfolioData.json").success(function (response) {
				$scope.portfolioData = response;
				console.log($scope.portfolioData);
			});
	}

	$scope.aboutMeSave = function (aboutme) {
		if (aboutme.length < 20){
			toaster.pop('success' , 20 - aboutme.length + " Characters are REMAINING");
		}
		else{
			var data = {
				'about_me' : aboutme,
				'field_name' : 'about_me'
			}
			$scope.savePostdataSingular(data);
			$scope.cancelEdit('about_text');
		}
	}
	$scope.BooksReadSave = function (books) {
		if (!books){
			toaster.pop('success' , "Input Required");
		}
		else{
			var data = {
				'books_read' : books,
				'field_name' : 'books_read'
			}
			$scope.savePostdataSingular(data);
			$scope.cancelEdit('books_read_text');
		}
	}
	$scope.SkillsSave = function (skills) {
		if (!skills){
			toaster.pop('success' , "Input Required");
		}
		else{
			var data = {
				'skills' : skills,
				'field_name' : 'skills'
			}
			$scope.savePostdataSingular(data);
			$scope.cancelEdit('skills_text');
		}
	}
	$scope.savePostdataSingular = function (data) {
		$http({
			method : 'POST',
			url    : '../Writers/aboutMeSave',
			data   : param(data),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function () {
			$scope.getPortfolioData();
			toaster.pop('success' , "data save");
		})
	}

	$scope.interestSave = function (interest) {
			if (!interest){
				toaster.pop('success' , "Input Required");
			}
			else{
			var data = {
				'interests' : interest,
				'field_name' : 'interests'
			}
			$scope.savePostdataSingular(data);
			$scope.cancelEdit('interest_text');
		}
	}
	// $scope.processDate = function(dt) {
	// 	var date = new Date(dt);
	// 	return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
	// }

	$scope.workSave = function (work_company , work_designation , work_location , work_started_from , work_till , work_present , work_description) {
	   if(!work_company){
	   		toaster.pop('success' , "Company Name Required");
	   }else if(!work_designation){
	   			toaster.pop('success' , " Dsignation Required");
	   }else if(!work_location){
	   			toaster.pop('success' , "Location Required");
	   }else if(!work_started_from){
	   			toaster.pop('success' , " Starting Date Required");
	   }else if(!work_description){
	   			toaster.pop('success' , "Description Required");
	   }
	   else{
		var data = {
			'work_company_name'			: work_company,
			'work_designation'			: work_designation,
			'work_location'				: work_location,
			'work_started_from_date'	: work_started_from,
			'work_started_till_date'	: work_till,
			'work_present'				: work_present,
			'work_description'			: work_description
		}
		// var dat = new Date(work_started_from);
		// dat = dat.toLocaleFormat();
		// console.log(work_started_from);
			$http({
				method : 'POST',
				url    : '../Writers/addWork',
				data   : param(data),
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).success(function () {
				$scope.getPortfolioData();
				$scope.cancelNew('work_text');
				toaster.pop('success' , "data save");
			})

		}
	}
	$scope.educationSave = function (education_school_name , education_location,education_degree, education_till , education_started_from , education_present , education_description) {
		if(!education_school_name){
		   		toaster.pop('success' , "School Name Required");
		   }else if(!education_location){
		   			toaster.pop('success' , "Location Required");
		   }else if(!education_degree){
		   			toaster.pop('success' , "Degree Required");
		   }else if(!education_started_from){
		   			toaster.pop('success' , "Start Date Required");
		   }else if(!education_description){
		   			toaster.pop('success' , "Description Required");
		   }
		   else{
			var data = {
				'education_school'			: education_school_name ,
				'education_degree'			: education_degree,
				'education_location'		: education_location,
				'education_started_from'	: education_started_from ,
				'education_till_date'		: education_till ,
				'education_present'			: education_present ,
				'education_description'		: education_description
			}
			console.log(data);
			$http({
				method : 'POST',
				url    : '../Writers/addEducation',
				data   : param(data),
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).success(function () {
				$scope.getPortfolioData();
				$scope.cancelNew('education_text');
				toaster.pop('success' , "data save");
			})
		}
	}
	$scope.saveProject = function (client_project_link , nameofmethod , div_id , field_name) {
			if(!client_project_link){
				   		toaster.pop('success' , "Input Required");
				   }
			else{
			var project_link = field_name;
			var data = {
				[project_link] : client_project_link
			}
			var methodName = '../Writers/'+nameofmethod;
			$scope.saveProjectData(data ,methodName);
			$scope.cancelNew(div_id);

		}
	}

	$scope.loadmodel = function (){
		
	}

	$scope.saveProjectData = function (data , methodName) {
		console.log(data);
		$http({
			method : 'POST',
			url    : methodName,
			data   : param(data),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function () {
			$scope.getPortfolioData();
			toaster.pop('success' , "data save");
		})
	}

	$scope.continue = function(){
		console.log('hii');
	}

	$scope.profileOther = function (id) {

		console.log(id);
		$scope.tabShowfx = false;
		$scope.conn_error=false; //Error message
		$scope.loading = true;  //Loading gif
		
		var updateTime = Date.now();


		$scope.getTab = function () {
			return '../Writers/profileOther?updated='+updateTime;
		};//Loading the respective page
		var data = {
			'id' : id
		}


		$http({
			method : 'POST',
			url : "../Writers/fetchPortfolioDataOther",
			data : param(data),
			headers :{
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function (response) {
			$scope.portfolioDataOther = response;
			$scope.getProfilePicOther = response.Writer.profile_pic + '?updated='+updateTime;
			console.log($scope.portfolioData);
		}).catch(function (err) {
				$scope.loading = false;
  				$scope.conn_error=true;
			}).finally(function () {
				// Hide loading spinner whether our call

				$timeout(function(){
					$scope.loading = false;
					$scope.tabShowfx = true;
				}, 400);
		});
	}

	




	/*===========================================================*/
	/*                DATE FORMAT  notification                  */
	/*===========================================================*/
	$scope.timeAgo = function(inputTime){
		
		var seconds = Math.floor((new Date() - new Date(inputTime)) / 1000);

	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1) {
	        return interval + " years";
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval > 1) {
	        return interval + " months";
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval > 1) {
	        return interval + " days";
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval > 1) {
	        return interval + " hours";
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval > 1) {
	        return interval + " minutes";
	    }
	    return Math.floor(seconds) + " seconds";

		// var currentTime = new Date();
 	// 	var mytime = new Date(inputTime);
 	// 	var diffMs = (currentTime - mytime) - (5*60*60*1000 + 29*60*1000);


 	// 	function convertMS(ms) {
  // 			var d, h, m, s;
  // 			s = Math.floor(ms / 1000);
  // 			m = Math.floor(s / 60);
  // 			s = s % 60;
  // 			h = Math.floor(m / 60);
  // 			m = m % 60;
  // 			d = Math.floor(h / 24);
  // 			h = h % 24;

  			
  // 			switch (true) {
		// 		case (d != 0):
		// 			return d + ' days ago';
		// 		case (h != 0):
		// 			return h + ' hours ago';
		// 		default:
		// 			return m + ' min ago';		
		// 	}
		// };

 	// 	return convertMS(diffMs);	
	};




	/*===========================================================*/
	/*                DATE FORMAT  notification                 */
	/*===========================================================*/
	$scope.dateOffset = function(inputTime) {

		var targetTime = new Date(inputTime);
		//get the timezone offset from local time in minutes
		//convert the offset to milliseconds, add to targetTime, and make a new Date

		var mytime = new Date(targetTime.getTime() + ((5*60*60*1000 + 30*60*1000)));
		//var mytime = new Date(inputTime) + (5*60*60*1000 + 29*60*1000);

		return mytime.getDate() + '-' + (mytime.getMonth() + 1) + "-" + mytime.getFullYear() + "   " + mytime.getHours() + ":" + mytime.getMinutes() + ":" + mytime.getSeconds();
	}



	

	/*==================================================================*/
	/*                ANGULAR PFOFILE PIC UPLOAD MODULE                 */
	/*==================================================================*/
	
	
	var writerpicuploader = function(file){
		var picuploader = $scope.picUploader = new FileUploader({
            url: '../Writers/writerProfilePicUpload/'
        });
        // FILTERS
	
		picuploader.filters.push({
			name: 'customFilter',
			fn: function(item /*{File|FileLikeObject}*/, options) {
				return this.queue.length < 1;
			}
		});
		var certificateUploader = $scope.certificateUploader = new FileUploader({
            url: '../Writers/writerCertificateupload/'
        });
        // FILTERS
		certificateUploader.filters.push({
			name: 'customFilter',
			fn: function(item /*{File|FileLikeObject}*/, options) {
				return this.queue.length < 1;
			}
		});
	};



	var uploadCertificate = function (file) {
		
	}

	





	/*************************************************************/
	/*             WRITER JOB DETAIL KEYPOINTS LIST VIEW         */
	/*************************************************************/
	$scope.mykeypointList = function(keypoints) {
		return keypoints.split(',');
	};


	





	










	/*******************************************************************/
	/*               FETCH SPECIALIZATION_KEY                          */
	/*******************************************************************/


	// var specializationsFetch =function(){
	// 	$http.get("../Writers/specializationsFetch").success(function(specializationDetails){
	// 			// console.log(specializationDetails.Writer_specialization);
	// 			$scope.specialization = specializationDetails.Writer_specialization;
	// 		});
	// 	// var words = ['i' , 'am' , 'gonna' , 'kill' , 'you'];
	// 	// for(var i = 0 ; i < 5 ; i++){
	// 	// 	console.log(words[i]);
	// 	// 	angular.element(document.getElementById('insert-chip')).innerHTML += '<div class="chip" id="'+words[i]+'">'+ words[i].split('-').join(' ')+'</div>';
	// 	// }
	// }

             

                                                       
});







// //first time portfolio loading
// angular.module('writerProfileData' , []).controller('writerProfile' ,function($scope , $http){
// 	$scope.continue = function(){
// 		console.log("dsd");
// 	}
// });