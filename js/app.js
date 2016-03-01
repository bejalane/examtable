(function(){

	var app = angular.module('test',[]);

	app.controller('usersCtrl',function($scope, $http, $rootScope){
		$http.get('users.json').success(function(response){
			$scope.users = response;
			for(var i=0; i<$scope.users.length; i++){
				$scope.users[i].show = true;
				$scope.users[i].active = ($scope.users[i].active) ? true : false;
			}
		});

		$scope.submit = function() {
			var searchbyVal = $scope.searchby;
			if(searchbyVal){
				if(searchbyVal != 'fullname') {
					for(var i=0; i<$scope.users.length; i++){
						var x = $scope.users[i][searchbyVal].toLowerCase().indexOf($scope.search.toLowerCase());
						$scope.users[i].show = (x == -1) ? false : true;
					}
				} else {
					for(var i=0; i<$scope.users.length; i++){
						var firstname = $scope.users[i].firstname;
						var lastname = $scope.users[i].lastname;
						var x = firstname.toLowerCase().indexOf($scope.search.toLowerCase());
						var y = lastname.toLowerCase().indexOf($scope.search.toLowerCase());
						
						$scope.users[i].show = (x != -1 || y != -1) ? true : false;
					}
				}
			} else {
				alert('Please, choose a sorting');
			}
		}

		$scope.resetSearch = function(){
			if(!$scope.search) {
				for(var i=0; i<$scope.users.length; i++){
					$scope.users[i].show = true;
				}
			}
		}

		$scope.modal = function(id){
			document.getElementById('modal').style.display = "block";
			document.getElementById('back-overlay').style.display = "block";
			for(var i=0; i<$scope.users.length; i++){
				if(id == $scope.users[i].id) {
					$scope.formchange = [$scope.users[i].username, $scope.users[i].firstname, $scope.users[i].lastname, $scope.users[i].address, $scope.users[i].id ];
				}
			}
		}

		$scope.updateInfo = function(){
			$http.post("update.php",{'username':$scope.formchange[0], 'firstname':$scope.formchange[1], 'lastname':$scope.formchange[2], 'address':$scope.formchange[3], 'id':$scope.formchange[4]})
			.success(function(data,status,headers,config){
				if(data == 3) {
					alert('Values must be at least 3 characters long, avoid cpecial charachters!');
				} else if (data == 2) {
					alert('smth went wrong');
				} else {
					$scope.edit = data[$scope.formchange[4]];

					for(var i=0; i<$scope.users.length; i++){
						if($scope.formchange[4] == $scope.users[i].id) {
							$scope.users[i].username = $scope.edit.username;
							$scope.users[i].firstname = $scope.edit.firstname;
							$scope.users[i].lastname = $scope.edit.lastname;
							$scope.users[i].address = $scope.edit.address;
						}
					}

					document.getElementById('modal').style.display = "none";
					document.getElementById('back-overlay').style.display = "none";
				}
			});
		}

		$scope.modalclose = function(){
			document.getElementById('modal').style.display = "none";
			document.getElementById('back-overlay').style.display = "none";
		}

		$scope.changeDone = function(indexid){
			var doneValue = $scope.users[indexid].active;
			doneValue = (doneValue == false) ? 0 : 1;
			
			$http.post("activeupdate.php",{'id':indexid, 'activevalue':doneValue})
			.success(function(data,status,headers,config){
				if (data == 2) {
					alert('smth went wrong');
				} else {
					$scope.active = data[indexid];

					for(var i=0; i<$scope.users.length; i++){
						if(indexid == $scope.users[i].id) {
							if($scope.active.active) {
								$scope.users[i].active = true;
							} else {
								$scope.users[i].active = false;
							}
						}
					}
				}
			});
		}


	});


})();