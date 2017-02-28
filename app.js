var app=angular.module('IxianFeng',['ngRoute','angularCSS','homeMo','shopMo','marketMo','me-lazyload','productMo','ngAnimate'])
.config(['$routeProvider',function(routePro){
	routePro.otherwise({redirectTo:'/home'})
}])
