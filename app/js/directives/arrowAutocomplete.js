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


            // scope.filteredList = [];
            scope.defaultPlaceholder = 'Введите или выберите из списка';
            scope.placeholder = attrs.placeholder || scope.defaultPlaceholder;
            scope.search = '';
            scope.focusedData = {
                index: 0,
                filteredList: []
            };
            scope.selectedItem = null;
            scope.dataList = [];
            scope.isOpenList = false;
            scope.itemLimit = 50;
            scope.loadMore = function() {
                scope.itemLimit += 5;
            };
            scope.selectItem = function (item) {
                scope.selectedItem = item;
                scope.search = item;
                scope.isOpenList = false;
                scope.isNextFocus = true;
            };

            scope.openList = function () {
                scope.isOpenList = true;
                // scope.focusInput();
                scope.itemLimit = 50;
                // if (!scope.selectedItem) {
                scope.focusedData.index = 0;
                // }
            };
            scope.focusedItem = function (index, item) {
                scope.focusedData.index = index;
                scope.focusedData.item = item;
            };

            scope.closeList = function () {
                scope.isOpenList = false;
            };

            scope.getFocusedItem = function () {
                return scope.focusedData.filteredList[scope.focusedData.index];
            };
            scope.getElementByIndex = function (index) {
                return scope.focusedData.filteredList[index];
            };
            scope.isNextFocus = false;
            scope.onKeydown = function($event) {
                var e = $event;
                var $target = $(e.target);
                switch (e.keyCode) {
                    case KeyCodes.ESCAPE:
                        scope.isOpenList = false;
                        break;
                    case KeyCodes.UPARROW:
                        if (scope.focusedData.index) {
                            scope.focusedData.index--;
                        }
                        break;
                    case KeyCodes.RETURNKEY:
                        scope.selectItem(scope.getFocusedItem());
                        $target.blur();
                        break;
                    case KeyCodes.DOWNARROW:
                        if (scope.focusedData.index + 1 < scope.focusedData.filteredList.length) {
                            scope.focusedData.index++;
                        }
                        break;
                    case KeyCodes.LEFTARROW:
                        console.log('LEFTARROW');
                        break;
                    case KeyCodes.TABKEY:
                        e.preventDefault();
                        scope.isNextFocus = true;
                        $target.blur();
                        break;
                    case KeyCodes.RIGHTARROW:
                        console.log('RIGHTARROW');
                        break;
                    default:
                        // scope.searchIndex();
                        scope.openList();
                }
            };
            scope.isInputFocused = false;
            scope.focusInput = function () {
                scope.isNextFocus = false;
                scope.isInputFocused = true;
            };
            // scope.searchIndex = function () {
            //     var index = -1;
            //     if (scope.search != '') {
            //         index = scope.dataList.findIndex(function (item) {
            //             return item.indexOf(scope.search) != -1;
            //         });
            //     }
            //     if (index >= 0) {
            //         scope.focusedData.index = index;
            //         console.log(index);
            //     }
            // };
        }
    };
}]);
