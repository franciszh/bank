var _ = require('underscore')

module.exports = function($scope, $q, $http) {
  this.getAll = function() {
      var deferred = $q.defer();
      $http.get('bank/public/MOCK_DATA.json').success(function(data) {
        deferred.resolve(data);
      })
      .error(function() {
        console.log('Failed to load data.');
        deferred.reject();
      });
      return deferred.promise;
    };

  this.getTransactionByDescription = function(description) {
      var deferred = $q.defer();
      $http.get('bank/public/MOCK_DATA.json').success(function(data) {
        var result = _.reject(data, function(transaction) {
          return transaction.description.indexOf(description) < 0;
        })
        deferred.resolve(result);
      })
      .error(function() {
        console.log('Failed to load data.');
        deferred.reject();
      });
      return deferred.promise;
  }
}
