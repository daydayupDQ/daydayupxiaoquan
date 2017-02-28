angular.module('productMo',['ngRoute'])
.config(['$routeProvider',function($route){
	$route.when('/product',{
		templateUrl:'component/superMarket/products/product.html',
		css:'component/superMarket/products/product.css',
		controller:'productCon',
	})
}])
.controller('productCon',['$scope',function($scope){
	$scope.getItem= JSON.parse(localStorage.getItem('foods'));
}])
