app.directive('splashScreen', function () {
    return {
        restrict: 'E',
        template: '<div id="splash-screen"><div id="loading-content">{{loadingText}}</div></div>',
        link: function (scope, ele) {

            scope.loadingText = "Loading";
            var interval = setInterval(() => {
                var append = scope.loadingText + " .";
                if(append.length > 14) append = "Loading";
                scope.loadingText = append;
                scope.$digest();
            }, 400);

            var splashTimer = setInterval(() => {
                if(!window.ready) return;
                // delete window.ready;
                clearInterval(interval);
                clearInterval(splashTimer);
                ele.remove();
            },2000 + (Math.round(Math.random() * 500)));

        }
    }
});
