//simple controller for use on none-working pages

angular.module('Congo.controllers').controller('GameboardCntl', ['$scope', 'accountServices', '$cookieStore',
    function($scope, accountServices, $cookieStore){
/*
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*//*, options) {
                return this.queue.length < 10;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
*/
    $scope.user = "";
    $scope.grid = [];
    $scope.gridLock = false;
    $scope.gridRefreshes = 0;


    $scope.init = function(){

        $scope.user = accountServices.getUser();
        //check if logged in
        if($scope.user == "" || $scope.user == undefined){
            window.location.href="#login";
        }

        $scope.gridLock = accountServices.getGridLock();
        $scope.gridRefreshes = accountServices.getGridRefreshes();

        $scope.grid = accountServices.getGrid();
        if($scope.grid == "" || $scope.grid == undefined || $scope.grid.length == 0){
            //roll a sheet
            $scope.grid = accountServices.buildNewBoard();
        }
    };

        $scope.lockBoard = function(){
            $scope.gridLock = true;
            accountServices.gridLock();
        }

    $scope.buildBoard = function(){
        $scope.grid = accountServices.buildNewBoard();
        $scope.gridRefreshes--;
        if($scope.gridRefreshes == 0){
            $scope.gridLock = true;
            accountServices.gridLock();
        }

        accountServices.updateGridRefreshes($scope.gridRefreshes);
        //console.log($scope.grid);
        accountServices.saveGrid($scope.grid);
    };

    $scope.logout = function(){
        //delete the cookies!!!!
        $cookieStore.remove('Congo');
        window.location.href="#login";
    }

    $scope.init();

}]);
