describe('SearchController', function () {

  var scope, searchController, searchServiceMock, $rootScope;

  beforeEach(module('bankApp'));

  beforeEach(function() {
    searchServiceMock = {
      getTransactionByDescription: function(description){},
      getAll: function() {}
    };
  });

  beforeEach(inject(function(_$rootScope_,$controller,$q) {
    scope = {};
    $rootScope = _$rootScope_;

    var deferred = $q.defer();
    deferred.resolve({id:1});
    spyOn(searchServiceMock, 'getAll').and.returnValue(deferred.promise);

    searchController = $controller('SearchController', {
      $scope : scope,
      SearchService: searchServiceMock
    });
  }));

  describe("searchTransaction", function() {

    it('should not proceed to Search given empty input', function() {
      spyOn(searchServiceMock, 'getTransactionByDescription');
      scope.searchTransaction("");
      $rootScope.$apply();
      expect(searchServiceMock.getTransactionByDescription).not.toHaveBeenCalled();
    });


    it('should delegate to SearchService to search by description', inject(function($q) {
      var deferred = $q.defer();
      deferred.resolve({id:1});
      spyOn(searchServiceMock, 'getTransactionByDescription').and.returnValue(deferred.promise);

      scope.searchTransaction("description");
      $rootScope.$apply();
      expect(searchServiceMock.getTransactionByDescription).toHaveBeenCalledWith("description");
      expect(scope.allTransactions).toEqual({id:1});
    }));

    it('should take the first 5 result to display', inject(function($q) {
      var allTransactions = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}];
      var deferred = $q.defer();
      deferred.resolve(allTransactions);
      spyOn(searchServiceMock, 'getTransactionByDescription').and.returnValue(deferred.promise);

      scope.searchTransaction("description");
      $rootScope.$apply();
      expect(searchServiceMock.getTransactionByDescription).toHaveBeenCalledWith("description");
      expect(scope.allTransactions).toEqual(allTransactions);
      expect(scope.transactions).toEqual(allTransactions.slice(0,5));
    }));
  });

  describe("loadMore", function() {
    it("it should get the next 5 transactions from all transactions",function(){
      var allTransactions = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7}];
      scope.allTransactions = allTransactions;
      scope.transactions = [{id:1}];

      scope.loadMore();
      expect(scope.transactions).toEqual(allTransactions.slice(0,6));
    });

    it("it should get all transactions given allTransactions has less than 5 objects left",function(){
      var allTransactions = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}];
      scope.allTransactions = allTransactions;
      scope.transactions = [{id:1}];

      scope.loadMore();
      expect(scope.transactions).toEqual(allTransactions);
    });
  });

  describe("hasMore", function() {
    it("should return true if some transactions haven't been displayed", function() {
      var allTransactions = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}];
      scope.allTransactions = allTransactions;
      scope.transactions = [{id:1}];

      expect(scope.hasMore()).toBe(true);
    });

    it("should return false if all transactions have been displayed", function() {
      var allTransactions = [{id:1}];
      scope.allTransactions = allTransactions;
      scope.transactions = allTransactions;

      expect(scope.hasMore()).toBe(false);
    });

  });
});
