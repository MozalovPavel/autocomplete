// 'use strict';

describe('Controller: ArrowAutocompleteCtrl', function () {

    // load the controller's module
    beforeEach(module('AutocomleteAplication'));

    var AutocompleteCtrl;
    var scope;
    var $httpBackend;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        $controller('ArrowAutocompleteCtrl', {
            $scope: scope,
            $attrs: {}
        });
    }));

    it('itemLimit should be equal to 55', function() {
        scope.dataList = new Array(55);
        expect(scope.itemLimit).toBe(50);
        scope.loadMore();
        scope.loadMore();
        expect(scope.itemLimit).toBe(55);
    });

    it('selectedItem should be equal to "test"', function() {
        var search = 'test';
        expect(scope.selectedItem).toBe(null);
        scope.selectItem();
        expect(scope.selectedItem).toBe('');
        scope.search = search;
        scope.selectItem();
        expect(scope.selectedItem).toBe(search);
    });

    it('selectedItem and search should be equal to "test2"', function() {
        scope.selectItem('test2');
        expect(scope.selectedItem).toBe('test2');
        expect(scope.search).toBe('test2');
    });

    it('isOpenList should be equal to true', function() {
        expect(scope.isOpenList).toBe(false);
        scope.openList();
        expect(scope.isOpenList).toBe(true);
    });

    it('filteredList should be equal to []', function() {
        scope.openList();
        expect(scope.focusedData.filteredList).toEqual(scope.dataList);
    });

    it('setFocusIndex should be called', function() {
        scope.dataList = ['test'];
        scope.selectedItem = scope.dataList[0];
        spyOn(scope, 'setFocusIndex');
        scope.openList();
        expect(scope.setFocusIndex).toHaveBeenCalled();
    });

});
