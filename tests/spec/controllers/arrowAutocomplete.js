'use strict';

describe('Controller: ArrowAutocompleteCtrl', function () {

    // load the controller's module
    beforeEach(module('AutocomleteAplication'));

    var AutocompleteCtrl;
    var scope;
    var $httpBackend;
    var compile;

    beforeEach(inject(function ($controller, $rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
        AutocompleteCtrl = $controller('ArrowAutocompleteCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('should return placeholder', function() {
        var placeholder = 'test';
        element = compile('<arrow-autocomplete placeholder=' + placeholder + '></arrow-autocomplete>')(scope);
        scope.$digest();
        expect(scope.placeholder).toBe(test);

    });
});
