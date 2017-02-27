app.filter('arrayFilter', function () {
    return function (items, string) {
        return items.filter(function (item) {
            return item.indexOf(string) === 0;
        });
    };
});
