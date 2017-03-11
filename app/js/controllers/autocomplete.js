app.controller('AutocompleteCtrl', ['$scope', '$controller', '$attrs',
function ($scope, $controller, $attrs) {
    $controller('ArrowAutocompleteCtrl', {
        $scope: $scope,
        $attrs: $attrs
    });
    $scope.itemLimit = 5;
    $scope.recalculationItemCount = function () {
        $scope.visibleItemCount = $scope.itemLimit;
        if ($scope.focusedData.filteredList.length < $scope.itemLimit) {
            $scope.visibleItemCount = $scope.focusedData.filteredList.length;
        }
    };
    $scope.openList = function () {
        setTimeout(function () {
            if ($scope.search) {
                $scope.isValidValue = true;
                $scope.isOpenList = true;
                $scope.focusedData.filteredList = $scope.dataList;
                if ($scope.selectedItem && $scope.getItemIndex($scope.selectedItem) != -1) {
                    var itemIndex = $scope.getItemIndex($scope.selectedItem);
                    $scope.setFocusIndex(itemIndex);
                    if (itemIndex > $scope.itemLimit) {
                        $scope.itemLimit = itemIndex;
                    }
                }
                $scope.focusedData.filteredList = $scope.getFiltredList($scope.dataList, $scope.search);
                $scope.recalculationItemCount();
            }
            $scope.$digest();
        }, 0);
    };
    $scope.clearSelectedItem = function () {
        $scope.setFocusIndex(-1);
        $scope.selectedItem = '';
        if (!$scope.isOpenList) {
            $scope.openList();
        }
    };
    $scope.$watch('search', function (value) {
        if (value) {
            $scope.setFocusIndex(0);
        }
        $scope.focusedData.filteredList = $scope.getFiltredList($scope.dataList, value);
        $scope.recalculationItemCount();
    });
}]);
