'use strict';

angular.module('yitianDocApp')
  .controller('SidebarCtrl', function ($scope,CategoryService,$uibModal) {

  		$scope.addCategory = function(){
  			var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'addCategoryModal.html',
			      controller: 'addCategoryCtrl',
			    });

  		};
  		/*var promise = CategoryService.getCategoryList()
		promise.then(function(result){
			$scope.docs = result.data;
		});*/
  		$scope.catagories = [
  		{id:'001',title:'测试',sort:999,pages:[{id:'0001',category:"001",title:'测试页',sort:999}]},
  		{id:'001',title:'测试',sort:999,pages:[{id:'0001',category:"001",title:'测试页',sort:999},{id:'0001',category:"001",title:'测试页一',sort:999}]},
  		{id:'001',title:'测试',sort:999,pages:[{id:'0001',category:"001",title:'测试页',sort:999}]}
  		]
  
  })
  .controller('addCategoryCtrl',function($scope,$uibModalInstance){
  	$scope.categoryName = "love";
  	 $scope.ok = function () {
  	 	console.log('good')
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
  })
  .service('CategoryService',['$http','$q',function($http,$q){
	var baseUrl = '/category';

	return {
		getCategoryList:function(){
			var deferred = $q.defer();
			$http.get(baseUrl).success(function(result){
				deferred.resolve(result);	
			}).error(function(result){
				deferred.reject(result);
			});

			return deferred.promise;
		},
		getCategory:function(_id){
			var deferred = $q.defer();
			$http.get(baseUrl+ '/' + _id).success(function(result){
				deferred.resolve(result);	
			}).error(function(result){
				deferred.reject(result);
			});

			return deferred.promise;
		},
		createCategory:function(category){
			var deferred = $q.defer();
			$http.post(baseUrl,category).success(function(result){
				deferred.resolve(result);	
			}).error(function(result){
				deferred.reject(result);
			});
			return deferred.promise;
		},
		updateCategory:function(category){
			var deferred = $q.defer();
			$http.put(baseUrl,category).success(function(result){
				deferred.resolve(result);	
			}).error(function(result){
				deferred.reject(result);
			});
			return deferred.promise;
		},
		deleteCategory:function(_id){
			return $http.delete(baseUrl,{_id:_id}).then(function(status){
				return status.data;
			});
		}
	}
}]);