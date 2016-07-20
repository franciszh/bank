require('angular')
var SearchController = require('./controllers/SearchController')
var SearchService = require('./services/SearchService')

var app = angular.module('bankApp', [])
app.service('SearchService', ['$rootScope', '$q', '$http', SearchService])
app.controller('SearchController', ['$scope', 'SearchService', SearchController])
