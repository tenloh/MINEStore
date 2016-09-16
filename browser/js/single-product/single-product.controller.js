app.controller('SingleProductCtrl', function ($scope, $state, $http, theProduct, CartFactory) {
	$scope.product = theProduct;
	$scope.isWritingAReview = false;
	$scope.isEditingAReview = false;

	$http.get('/api/reviews/products/' + theProduct.id)
		.then(function (reviews) {
			//array of reviews fetched from the server
			$scope.reviews = reviews.data;
			var total = 0;
			$scope.reviews.forEach(function (review) {
				total += +review.stars;
			});

			$scope.avgReviews = (total / ($scope.reviews.length)).toFixed(2);
		});


	//review stars
	$scope.maxRating = 5;
    $scope.ratedBy = 0;
    $scope.rateBy = function (star) {
        $scope.ratedBy = star;
    };
    ////////////////

	$scope.openReviewCreate = function () {
		$scope.isWritingAReview = true;
	};

	$scope.createAReview = function (content, stars) {

		var reviewObj = {
			reviewContent: content,
			stars: stars
		};

		if ($scope.isWritingAReview && !$scope.isEditingAReview) {
			$http.post('/api/reviews/products/' + theProduct.id, reviewObj)
				.then(function (createdReview) {
					$state.reload();
				});
		}

		if ($scope.isWritingAReview && $scope.isEditingAReview) {
			$http.put('/api/reviews/' + $scope.reviewId, reviewObj)
				.then(function () {
					$scope.reviewId = null;
					$scope.reviewContent = null;
					$state.reload();
				})
		}

	};


	$scope.editReview = function (review) {
		$scope.isWritingAReview = true;
		$scope.isEditingAReview = true;
		$scope.reviewContent = review.reviewContent;
		$scope.reviewId = review.id;
		// $scope.review.id = review.id;

	};

	$scope.deleteReview = function (review) {
		$http.delete('/api/reviews/' + review.id)
			.then(function () {
				console.log('successfully deleted');
				$state.reload();
			});
	};

	$scope.addToCart = function (product) {
		CartFactory.addItemToCart(product.id, product.price)
			.then(function (cart) {
				$state.go('cart');
				return cart;
			}).catch(console.error.bind(console));
	}


})