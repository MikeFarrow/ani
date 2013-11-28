angular.module('dir.colopic', [])

.constant('colConf', {
	arrCols: ['black', 'blue', "#5484ED", "#A4BDFC", 'cyan', "#46D6DB", "#7AE7BF", "#51B749", 'green', 'yellow', "#FBD75B", "#FFB878", "#FF887C", "#DC2127", 'red', 'purple', 'magenta', 'violet', "#DBADFF", 'grey', "#E1E1E1", 'white']
})

// Controller for colopic directive
.controller('ColPicCont', ['$scope', '$attrs', '$timeout', function ($scope, $attrs, $timeout) {

	$scope.selectColor = function(color) {
		for (var i = 0; i < $scope.colorList.length; i++) {
			$scope.colorList[i].select = 1;
			if ($scope.colorList[i] === color) {
				$scope[$scope.modelObject][$scope.modelProperty] = color.color;

				$scope.colorList[i].select = 2;
			}
		}
	};
}])

// Colopic directive
.directive('ngColorPicker', function (colConf) {

	return {
		restrict: 'E',
		replace: true,
		scope : '@=',
		controller:'ColPicCont',
		templateUrl: 'template/colopic.html',
		compile: function compile(tElement, tAttrs, transclude) {
			return {
				post: function postLink(scope, iElement, iAttrs, controller) { 
					scope.modelObject   = iAttrs.modelObject;
					scope.modelProperty = iAttrs.modelProperty;
					scope.colorList = [];
					angular.forEach(colConf.arrCols, function(color) {
						scope.colorList.push({
							color : color,
							select : 1
						});
					});
				}
			};
		},
	}
})