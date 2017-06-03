//route provider is defined in the controller.js
//handles all url interactions by assinging routes to partial pages as well as the controller they are supposed to respond to

var app = angular.module('Congo', ['Congo.controllers', 'Congo.services', 'Congo.filters', 'ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
    $routeProvider.
        when("/login",  {templateUrl:'componentPages/loginPage/loginPartial.html',  controller:'LoginCntl'}).
        when("/createAccount",  {templateUrl:'componentPages/createAccountPage/createAccountPartial.html',  controller:'CreateAccountCntl'}).
        when("/gameboard",  {templateUrl:'componentPages/gameboardPage/gameboardPartial.html',  controller:'GameboardCntl'}).
        when("/404", {templateUrl:'componentPages/homePage/404Partial.html', controller:'HomeCntl'}).
        otherwise({redirectTo: '/login'});
    });
