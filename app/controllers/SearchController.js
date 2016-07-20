var _ = require('underscore')

module.exports = function($scope, searchService) {
	const displaySize = 5;

	searchService.getAll().then(function(data) {
		$scope.allTransactions = data;
		$scope.transactions = _.first($scope.allTransactions, displaySize);
	});

	$scope.searchTransaction = function(description) {
		if (description) {
			searchService.getTransactionByDescription(description)
				.then(function(data) {
					$scope.allTransactions = data;
					$scope.transactions = _.first(data, displaySize);
				});
		}
	};

	$scope.loadMore = function() {
		var start = $scope.transactions.length;
		var end = (start+displaySize > $scope.allTransactions.length) ? $scope.allTransactions.length : start+displaySize;
		$scope.transactions = $scope.transactions.concat($scope.allTransactions.slice(start, end));
	};

	$scope.hasMore = function() {
		return _.difference($scope.allTransactions, $scope.transactions).length > 0;
	}
}
