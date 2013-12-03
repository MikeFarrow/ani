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