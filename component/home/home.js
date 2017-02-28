angular.module('homeMo',['ngRoute'])
.config(['$routeProvider',function($route){
	$route.when('/home',{
		templateUrl:'component/home/home.html',
		css:'component/home/home.css',
		controller:'homeCon',
	})
}])
.service('swiper',function(){
	this.swipe=function(){
		 mySwiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: 2000,
				autoplayDisableOnInteraction: false,
				// 如果需要分页器
				pagination: '.swiper-pagination',

				// 如果需要前进后退按钮
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',

				// 如果需要滚动条
				scrollbar: '.swiper-scrollbar',
		});
	}
	
})
.service('homedata',['$http',function($http){
	this.get=function(){
		return $http.get('json/home.json');
	}
}])
.controller('homeCon',['$scope','swiper','homedata',function(scope,swiper,homedata){
	swiper.swipe();
	homedata.get().success(function(res){
		var res=res.data.act_info;
		/*活动图标*/
		scope.getActIcon=res[1].act_rows;
		/*活动商标*/
		scope.getActBrand=res[3].act_rows;
		/*送货到家*/
		scope.getHomeBusiness=res[4].act_rows;
		/*商业*/
		scope.business=res[4].act_rows[0].act_rows[0].chead_detail.img;
		/*商业活动*/
		scope.activity=res[4].act_rows[1].act_rows;
		/*商业cicons*/
		scope.cicons=res[4].act_rows[2].act_rows;
		/*商业cscene*/
		scope.cscene=res[4].act_rows[3].act_rows
		/*活动种类*/
		scope.getActCategory=res[5].act_rows;
		console.log(scope.getActCategory);
	})
}])
