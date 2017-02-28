angular.module('shopMo',['ngRoute'])
.config(['$routeProvider',function($route){
	$route.when('/shopcar',{
		templateUrl:'component/shop/shop.html',
	})
}])
