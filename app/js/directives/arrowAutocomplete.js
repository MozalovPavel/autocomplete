angular.module('AutocomleteAplication')
.directive('arrowAutocomplete', [ 'KeyCodes',  function(KeyCodes) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../../views/directives/arrowAutocomplete.html',
        scope: {
            dataList: '=list'
        },
        link: function (scope, element, attrs) {
            scope.placeholder = attrs.placeholder || '';
            scope.disabled = attrs.hasOwnProperty('disabled');
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
            scope.itemLimit = 50;
            scope.isNextFocus = false;
            scope.loadMore = function() {
                scope.itemLimit += 5;
            };
            scope.selectItem = function (item) {
                if (!item) {
                    scope.selectedItem = scope.search;
                } else {
                    scope.selectedItem = item;
                    scope.search = item;
                }
                scope.isOpenList = false;

            };

            scope.openList = function () {
                setTimeout(function () {
                    scope.isValidValue = true;
                    scope.isOpenList = true;
                    if (scope.search) {
                        scope.focusedData.index = 0;
                        scope.itemLimit = 50;
                    }
                    scope.$digest();
                }, 0);
            };

            scope.closeList = function () {
                scope.isOpenList = false;
                scope.focusedData.index = -1;
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
                        if (scope.focusedData.index + 1 < scope.focusedData.filteredList.length) {
                            scope.focusedData.index++;
                        }
                        break;
                    case KeyCodes.LEFTARROW:
                        console.log('LEFTARROW');
                        break;
                    case KeyCodes.RIGHTARROW:
                        console.log('RIGHTARROW');
                        break;
                    case KeyCodes.TABKEY:
                        $target.blur();
                        break;
                    case KeyCodes.BACKSPACE:
                        scope.focusedData.index = -1;
                        break;
                    default:
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
        }
    };
}]);
