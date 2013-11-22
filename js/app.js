var myap = angular.module('myap', ['directive.colorPicker', 'ngResource', 'ui.bootstrap.accordion']);

//This configures the routes 
myap.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/',
            {
                controller: 'homeCont',
                templateUrl: 'home.html'
            })
        .when('/play/',
            {
                controller: 'editCont',
                templateUrl: 'play.html'
            })

        .otherwise({ redirectTo: '/' });

	// Remove # from url paths
	$locationProvider.html5Mode(false);
	//$locationProvider.hashPrefix('!');

});

(function(angular) {
	var ngColorPicker = angular.module('directive.colorPicker', []);

	var colors = ['black', 'blue', "#5484ED", "#A4BDFC", 'cyan', "#46D6DB", "#7AE7BF", "#51B749", 'green', 'yellow', "#FBD75B", "#FFB878", "#FF887C", "#DC2127", 'red', 'purple', 'magenta', 'violet', "#DBADFF", 'grey', "#E1E1E1", 'white'];
   /*
   var colors = ['aqua', 'crimson', 'azure'];

   var colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'purple', 'magenta', 'grey', 'black', 'white', 'crimson', 'aqua', 'azure', 'violet']; 
  */ 

  ngColorPicker.directive('ngColorPicker', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope : '@=',
      template: '<table>'
      +           '<tr class="colpal" >'
      +           '<td ng-repeat="color in colorList">'
      +             '<div style=" border: {{color.select}}px solid #000; background-color: {{color.color}}" ng-click="selectColor(color)">'
      +             '</div>'
      +           '<td>'
      +           '</tr>'
      +         '</table>',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) { 
            scope.modelObject   = iAttrs.modelObject;
            scope.modelProperty = iAttrs.modelProperty;
            scope.colorList = [];
            angular.forEach(colors, function(color) {
              scope.colorList.push({
                color : color,
                select : 1
              });
            });
          }
        };
      },
      controller: function($scope, $element, $timeout) {
        $scope.selectColor = function(color) {
          for (var i = 0; i < $scope.colorList.length; i++) {
            $scope.colorList[i].select = 1;
            if ($scope.colorList[i] === color) {
              $scope[$scope.modelObject][$scope.modelProperty] = color.color;
              
              $scope.colorList[i].select = 2;
            }
          }
        };
      }
    };
  }]);
})(window.angular);