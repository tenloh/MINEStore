'use strict';

app.controller('CatalogCtrl', function($scope, $http, $state, CartFactory, CatalogFactory){
	
	CatalogFactory.getAll()
	.then(function(products){
		$scope.products = products;
		$scope.all = angular.copy($scope.products, []);
		// $scope.rarity = $scope.products.rarity
			
	});
	console.log($scope.all);
	$scope.categories=["All", "Mineral", "Meteorite", "Rock"];
	$scope.detail = function(product){
		$state.go('singleproduct', {productID: product.id});
	}

	$scope.filter=function(cat){
		$scope.products=angular.copy($scope.all, []);
		if (cat==='All'){
			return;
		}
		$scope.products=$scope.products.filter(function(product){
			return product.category===cat;
		})
		// CatalogFactory.getAll()
		// .then(function(products){
		// 	$scope.products=products;
		// })
	}

	$scope.addToCart= function(product){
		CartFactory.addItemToCart(product.id, product.price)
		.then(function(cart){
			$state.go('cart')
			return cart;
		}).catch(console.error.bind(console));
	}
})