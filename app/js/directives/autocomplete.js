app.directive('autocomplete', [ 'KeyCodes', '$filter',  function(KeyCodes, $filter) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../../views/directives/autocomplete.html',
        scope: {
            dataList: '=list'
        },
        link: function (scope, element, attrs) {
            scope.placeholder = attrs.placeholder || '';
            scope.disabled = attrs.hasOwnProperty('disabled');
            scope.tabindex = 1;
            if (scope.disabled) {
                scope.tabindex = -1;
            }
            scope.validationMessages = {
                error: attrs.errorMessage,
            };
            scope.search = '';
            scope.focusedData = {
                index: -1,
                filteredList: []
            };
            scope.selectedItem = null;
            scope.dataList = [];
            scope.isOpenList = false;
            scope.itemLimit = 5;
            scope.isNextFocus = false;

            scope.selectItem = function (item) {
                if (!item) {
                    scope.selectedItem = scope.search;
                } else {
                    scope.selectedItem = item;
                    scope.search = item;
                }
                scope.isOpenList = false;
            };
            scope.recalculationItemCount = function () {
                scope.visibleItemCount = scope.itemLimit;
                if (scope.focusedData.filteredList.length < scope.itemLimit) {
                    scope.visibleItemCount = scope.focusedData.filteredList.length;
                }
            };
            scope.openList = function () {
                setTimeout(function () {
                    if (scope.search) {
                        scope.isValidValue = true;
                        scope.isOpenList = true;
                        scope.focusedData.filteredList = scope.dataList;
                        if (scope.selectedItem && scope.getItemIndex(scope.selectedItem) != -1) {
                            var itemIndex = scope.getItemIndex(scope.selectedItem);
                            scope.setFocusIndex(itemIndex);
                            if (itemIndex > scope.itemLimit) {
                                scope.itemLimit = itemIndex;
                            }
                        }
                        scope.focusedData.filteredList = scope.getFiltredList(scope.dataList, scope.search);
                        scope.recalculationItemCount();
                        scope.$digest();
                    }
                }, 0);
            };
            scope.closeList = function () {
                scope.isOpenList = false;
                scope.setFocusIndex(-1);
                scope.selectItem();
                scope.validation();
            };
            scope.getElementByIndex = function (index) {
                return scope.focusedData.filteredList[index];
            };
            scope.onKeydown = function($event) {
                var e = $event;
                var $target = $(e.target);
                switch (e.keyCode) {
                    case KeyCodes.ESCAPE:
                        scope.closeList();
                        break;
                    case KeyCodes.RETURNKEY:
                        if (scope.isOpenList) {
                            scope.selectItem(scope.getElementByIndex(scope.focusedData.index));
                        }
                        scope.nextFocus();
                        break;
                    case KeyCodes.UPARROW:
                        if (scope.focusedData.index > 0) {
                            scope.focusedData.index--;
                        }
                        break;
                    case KeyCodes.DOWNARROW:
                        if (scope.focusedData.index + 1 < scope.focusedData.filteredList.length &&
                            scope.focusedData.index + 1 < scope.itemLimit) {
                            scope.focusedData.index++;
                        }
                        break;
                    case KeyCodes.LEFTARROW:
                        e.preventDefault();
                        break;
                    case KeyCodes.RIGHTARROW:
                        e.preventDefault();
                        break;
                    case KeyCodes.TABKEY:
                        e.preventDefault();
                        scope.nextFocus();
                        break;
                    case KeyCodes.BACKSPACE:
                        scope.clearSelectedItem();
                        break;
                    default:
                        if (!scope.isOpenList) {
                            scope.openList();
                        }
                }
            };
            scope.clearSelectedItem = function () {
                scope.setFocusIndex(-1);
                scope.selectedItem = '';
                if (!scope.isOpenList) {
                    scope.openList();
                }
            };
            scope.isInputFocused = false;
            scope.focusInput = function () {
                scope.isInputFocused = true;
            };
            scope.nextFocus = function () {
                scope.isNextFocus = true;
            };

            scope.isValidValue = true;
            scope.validation = function () {
                if (scope.dataList.indexOf(scope.selectedItem) == -1 && scope.selectedItem) {
                    scope.isValidValue = false;
                } else {
                    scope.isValidValue = true;
                }
            };
            scope.getItemIndex = function (item) {
                return scope.dataList.indexOf(item);
            };

            scope.setFocusIndex = function (index) {
                scope.focusedData.index = index;
            };
            scope.getFiltredList = function (list, filteredString) {
                return $filter('arrayFilter')(list, filteredString);
            };
            scope.$watch('search', function (value) {
                if (value) {
                    scope.setFocusIndex(0);
                }
                scope.focusedData.filteredList = scope.getFiltredList(scope.dataList, value);
                scope.recalculationItemCount();
            });
        }
    };
}]);
