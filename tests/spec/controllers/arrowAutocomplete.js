// 'use strict';

describe('Controller: ArrowAutocompleteCtrl', function () {

    // load the controller's module
    beforeEach(module('AutocomleteAplication'));

    var AutocompleteCtrl;
    var scope;
    var $httpBackend;
    var keyCodes;
    // var angular

    beforeEach(inject(function ($controller, $rootScope, KeyCodes) {
        scope = $rootScope.$new();
        keyCodes = KeyCodes;
        $controller('ArrowAutocompleteCtrl', {
            $scope: scope,
            $attrs: {}
        });
        scope.dataList = ['test', 'test2', 'test3'];
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

    it('filteredList should be equal to dataList', function() {
        scope.openList();
        expect(scope.focusedData.filteredList).toEqual(scope.dataList);
    });

    it('setFocusIndex should be called', function() {
        scope.selectedItem = scope.dataList[0];
        spyOn(scope, 'setFocusIndex');
        scope.openList();
        expect(scope.setFocusIndex).toHaveBeenCalled();
    });

    it('onKeydown should call closeList', function() {
        scope.openList();
        expect(scope.isOpenList).toEqual(true);
        var event =  $.Event('keydown');
        event.keyCode = keyCodes.ESCAPE;
        spyOn(scope, 'closeList');
        scope.onKeydown(event);
        expect(scope.closeList).toHaveBeenCalled();
    });

    it('onKeydown should call selectItem', function() {
        scope.openList();
        expect(scope.isOpenList).toEqual(true);
        var event =  $.Event('keydown');
        event.keyCode = keyCodes.RETURNKEY;
        spyOn(scope, 'selectItem');
        scope.onKeydown(event);
        expect(scope.selectItem).toHaveBeenCalled();
    });

    it('focusedData.index should be 1 and 2', function() {
        scope.focusedData.index = 2;
        scope.openList();
        expect(scope.isOpenList).toEqual(true);
        var event =  $.Event('keydown');
        event.keyCode = keyCodes.UPARROW;
        scope.onKeydown(event);
        expect(scope.focusedData.index).toEqual(1);
        event.keyCode = keyCodes.DOWNARROW;
        scope.onKeydown(event);
        expect(scope.focusedData.index).toEqual(2);
    });

    it('onKeydown should call nextFocus', function() {
        scope.openList();
        expect(scope.isOpenList).toEqual(true);
        var event =  $.Event('keydown');
        spyOn(scope, 'nextFocus');
        event.keyCode = keyCodes.TABKEY;
        scope.onKeydown(event);
        expect(scope.nextFocus.calls.count()).toEqual(1);
        event.keyCode = keyCodes.RETURNKEY;
        scope.onKeydown(event);
        expect(scope.nextFocus.calls.count()).toEqual(2);
    });

    it('onKeydown should call clearSelectedItem', function() {
        scope.openList();
        expect(scope.isOpenList).toEqual(true);
        var event =  $.Event('keydown');
        event.keyCode = keyCodes.BACKSPACE;
        spyOn(scope, 'clearSelectedItem');
        scope.onKeydown(event);
        expect(scope.clearSelectedItem).toHaveBeenCalled();
    });

});
