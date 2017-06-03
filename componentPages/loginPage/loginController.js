//simple controller for use on none-working pages

angular.module('Congo.controllers').controller('LoginCntl', ['$scope', 'accountServices', '$cookies', '$cookieStore',
    function($scope, accountServices, $cookies, $cookieStore){

    $scope.newAccount = true;
    $scope.itBroke = false;


    placeCookie=function(user, hash) {
        var cookie = {user: user, hash : hash};
        $cookieStore.put('Congo', cookie);
    };

    checkCookie=function(){
        var congoCookie = angular.fromJson($cookies.Congo);
        console.log(congoCookie);
        if(congoCookie!=null) {
            $scope.user = congoCookie.user;
            $scope.hashLogin(congoCookie.user, congoCookie.hash);
        }
    };

    $scope.hashLogin = function(user, hash){
        //send hash to sql
        accountServices.login(user, hash).then(function(data){
            if (data == "pw"){
                //Fail
                console.log("bad pw");
                $scope.password = "";
                $scope.loginPBroke = true;
            } else if (data == "un"){
                //Fail
                console.log("bad un");
                $scope.username = "";
                $scope.password = "";
                $scope.loginUBroke = true;
            } else if(data[0] != "" || data[0] != undefined){
                //Success
                placeCookie(user, hash);
                accountServices.loadUser(data[0]);
                window.location.href="#gameboard";
            }
        });
    };

    $scope.login = function(user, pw){
        //hash the user/pass together
        var hash = (user + pw).hashCode();
        //send hash to sql
        accountServices.login(user, hash).then(function(data){
            if (data == "pw"){
                //Fail
                console.log("bad pw");
                $scope.password = "";
                $scope.loginPBroke = true;
            } else if (data == "un"){
                //Fail
                console.log("bad un");
                $scope.username = "";
                $scope.password = "";
                $scope.loginUBroke = true;
            } else if(data[0] != "" || data[0] != undefined){
                //Success
                placeCookie(user, hash);
                accountServices.loadUser(data[0]);
                window.location.href="#gameboard";
            }
        });
    };

    $scope.needAccount = function(){
        $scope.newAccount = false;
    };

    $scope.makeAccount = function(user, pw){
        //hash the user / pass and store it
        var hash = (user + pw).hashCode();

        //send the user / hash to the server as a new entry
        accountServices.createNewAccount(user, hash).then(function(data){
            console.log(data);
            if(data == "-1"){
                //failure
                $scope.itBroke = true;
            } else {
                //succuess!
                console.log("account made");
                //reset the page
                $scope.newAccount = true;
                $scope.password = "";
            }
        });
    }


    $scope.init = function() {
        checkCookie();
    };

    $scope.init();
}]);
