/**
 * Created by garffan on 10/21/13.
 */

function filterCntrl($scope, filtersProvider) {
    $scope.filters = filtersProvider.getFilters();
    $scope.events = {};

    var selectedFilters = { universityDep : {}, taskTypes : {} };

    $scope.events.click = function($event) {
        var target = $($event.target || $event.srcElement);
        var type = target.attr('data-section'), id = target.attr('data-id');
        if (target.hasClass('color-set')) {
            target.removeClass('color-set').css('background', 'transparent');
            delete selectedFilters[type][id];
        } else {
            for(var i = 0; i < $scope.filters[type].length; ++i) {
                if (id == $scope.filters[type][i].id) {
                    target.addClass('color-set').css('background', $scope.filters[type][i].color);
                    selectedFilters[type][id] = $scope.filters[type][i];
                }
            }
        }
        filtersProvider.events.fire('filters set changed', selectedFilters);
    };

    filtersProvider.events.addEventListener('filters got', function () {
        $scope.filters = filtersProvider.getFilters();
        $scope.$digest();
    });
}
