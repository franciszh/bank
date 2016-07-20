describe('SearchService', function() {
	var $httpBackend, service;
	var data = [
		{"date":"18/07/2016", "description":"whatever", "debit":"-$1.00", "balance":"$414.29"},
		{"date":"18/06/2016", "description":"good", "debit":"+$2.50", "balance":"$416.79"}];

	beforeEach(module('bankApp'));

	beforeEach(inject(function(_$httpBackend_){
		$httpBackend = _$httpBackend_;
	}));

	beforeEach(inject(function(SearchService){
		service = SearchService;
		$httpBackend.expectGET('/MOCK_DATA.json').respond(200, data);
	}));

	it('getAll should load all transactions', function(){
		service.getAll().then(function(data) {
			expect(data.length).toBe(2);
		});
		$httpBackend.flush();
	});

	it('getTransactionByDescription should filter transactions with description', function() {
		service.getTransactionByDescription("good").then(function(data) {
			expect(data.length).toBe(1);
			expect(data[0].description).toBe("good");
		});
		$httpBackend.flush();
	})
});
