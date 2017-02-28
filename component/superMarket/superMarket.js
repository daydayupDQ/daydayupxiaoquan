angular.module('marketMo',['ngRoute'])
.config(['$routeProvider',function($route){
	$route.when('/supermarket',{
		templateUrl:'component/superMarket/supermarket.html',
		css:'component/superMarket/supermarket.css',
		controller:'marketCon',
	})
}])
.service('homedata1',['$http',function($http){
	this.get=function(){
		return $http.get('json/quickDelivery.json');
	}
}])
.controller('marketCon',['$scope','homedata1','$interval',function($scope,homedata1,interval){
	
	homedata1.get().success(function(res){
		var res=res.data;
		/*获取种类行*/
		$scope.getCategories=res.categories;
		console.log($scope.getCategories);
		/*获取品种商品*/
		$scope.cateId=104757;
		
		/*interval(function(){
			$scope.getSpecialPrice=res.products[$scope.cateId];
			console.log($scope.cateId);
		},1000)*/
		
		/*商品切换*/
		/*商品种类数组clone*/
		var clonegetSpecialPrice=JSON.parse(JSON.stringify(res.products[$scope.cateId]));
		console.log(clonegetSpecialPrice);
		$scope.change=function(cateId,cids){
			$scope.getCids='';
			$scope.cids=cids;
			$scope.cateId=cateId;
			clonegetSpecialPrice=JSON.parse(JSON.stringify(res.products[$scope.cateId]));
			$scope.getSpecialPrice=res.products[$scope.cateId];
			
		}
		$scope.getSpecialPrice=res.products[$scope.cateId];
		/*初始化细致分类*/
		$scope.cids=$scope.getCategories[0].cids;
		/*商品分类&&排序*/
		/*排序出现隐藏*/
		$scope.flag=false;
		/*点击排序*/
		$scope.sortFun=function(sortNum){
			if(sortNum==0){
						$scope.getSpecialPrice=clonegetSpecialPrice;
					}else if(sortNum==1){
						$scope.getSpecialPrice=res.products[$scope.cateId];
						$scope.getSpecialPrice.sort(function(a,b){
							return parseInt(b.sort)-parseInt(a.sort);
						});
					
					}else if(sortNum==2){
							$scope.getSpecialPrice=res.products[$scope.cateId];
							$scope.getSpecialPrice.sort(function(a,b){
							return Number(a.price)-parseInt(b.price);
							});
					
					}else if(sortNum==3){
						$scope.getSpecialPrice=res.products[$scope.cateId];
						$scope.getSpecialPrice.sort(function(a,b){
							return Number(b.price)-parseInt(a.price);
						})
					}
		}
		//console.log($scope.getSpecialPrice);
		/*商品细致分类*/
		/*商品细致分类出现flag*/
		$scope.CategoryFlag=false;
		$scope.setCategoryId=function(id){
			$scope.getCids=id;	
			console.log($scope.getCids);
			$scope.flag=false;
		}
		/*点击商品增加事件*/
		$scope.addFood=function($event){
			console.log($event);
			var a=Number($($event.target).prev().text());
			a++;
			$($event.target).prev().text(a);
		}
		/*点击商品减少*/
		$scope.reduceFood=function($event){
			var a=Number($($event.target).next().text());
			a--;
			if(a<=0){
				console.log(a);
				a=0;
			}
			$($event.target).next().text(a);
		}
		/*设置二级页面存储值*/
		$scope.setLocal=function(obj){
			console.log(obj);
			var foods={
				img:obj.img,
				name:obj.name,
				longName:obj.long_name,
				currentPrice:obj.price,
				marketPrice:obj.market_price,
			}
			localStorage.setItem('foods',JSON.stringify(foods));
			console.log(localStorage.getItem('foods'))
		}
	})
}])
