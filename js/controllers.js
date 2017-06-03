angular.module('Congo.controllers',[]);

/*
Main Controller for apps existance.

injects:
the route provider to handle partials,
the http to handle ajax,
the location to handle redirects/ajax

 */

angular.module('Congo.controllers').controller('CongoCntl', ['$scope', '$route',
        function($scope, $route){


}]);

String.prototype.hashCode = function () {
    var h = 0, i = 0, l = this.length;
    if (l === 0) return h;
    for (; i < l; i++) {
        h = ((h << 5) - h) + this.charCodeAt(i);
        h |= 0; // Convert to 32bit integer
    }
    return h;
};



//};
