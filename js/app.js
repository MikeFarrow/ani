var myap = angular.module('myap', ['dir.colopic', 'ngResource', 'ui.bootstrap.accordion']);

//This configures the routes 
myap.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/',
            {
                controller: 'homeCont',
                templateUrl: 'template/home.html'
            })
        .when('/edit/:anid',
            {
                controller: 'editCont',
                templateUrl: 'template/edit.html'
            })
        .when('/edit/',
            {
                controller: 'editCont',
                templateUrl: 'template/edit.html'
            })

        .otherwise({ redirectTo: '/' });

	// Remove # from url paths
	$locationProvider.html5Mode(false);
	//$locationProvider.hashPrefix('!');

});

// This function returns the item in an array that matches a property
myap.filter('getByProp', function() {
    return function(propertyName, propertyValue, collection) {
        var i=0, len=collection.length;
        for (; i<len; i++) {
            if (collection[i][propertyName] == +propertyValue) {
                return collection[i];
            }
        }
        return null;
    }
});