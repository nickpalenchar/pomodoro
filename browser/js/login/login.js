app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $rootScope, $window) {

    $scope.login = {};
    $scope.error = null;

    $scope.goBack = function () {
        $window.history.back();
    }

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
            console.info("setting guest mode to false ");
            $rootScope.guestMode = false;
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
