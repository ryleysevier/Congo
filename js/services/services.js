angular.module('Congo.services', [])
    .service('accountServices', ['$http', '$q', function($http, $q){

        var optionUrl = "options.php";

        var squareSource = ["Castlevania",
            "Team Fortress",
            "Mushroom Kingdom",
            "Gender Bender",
            "Crossover/Fusion",
            "Anime",
            "DnD",
            "Sleeping Person",
            "Final Fantasy",
            "Megaman",
            "Pokemon",
            "Waldo",
            "League of Legends",
            "Tabletop",
            "Meta",
            "Low Budget",
            "Blizzard Game",
            "Punny",
            "Star Wars",
            "Star Trek",
            "Halo",
            "Furry",
            "It Wont Fit On Camera",
            "Event Staff",
            "DC Comics",
            "Marvel Comics",
            "Arcade Fighter",
            "Minecraft",
            "Left 4 Dead",
            "Half-life",
            "Sonic",
            "Sony Mascots",
            "WAT IS THAT",
            "Harry Potter"];

        var storeUser;
        var storeHash;
        var storeGridSheet = [];
        var storeTableLock;
        var storeTableRefreshes;

        this.loadUser = function(userData){
            storeUser = userData['name'];
            console.log(storeUser);
            storeHash = userData['hash'];
            console.log(storeHash);
            storeGridSheet = angular.fromJson(userData['congodat']);
            console.log(storeGridSheet);
            storeTableLock = userData['tableLock'];
            console.log(storeTableLock);
            storeTableRefreshes = userData['tableRefresh'];
            console.log(storeTableRefreshes);
        };

        this.setUserHash = function(user, hash){
            storeUser = user;
            storeHash = hash;
        };

        this.getUser = function(){
            return storeUser;
        };

        this.getHash = function(){
            return storeHash;
        };

        this.getGrid = function(){
            return storeGridSheet;
        };

        this.setGrid = function(gridSheet){
            storeGridSheet = gridSheet;
        };

        this.getGridLock = function(){
            return storeTableLock;
        };

        this.getGridRefreshes = function(){
            return storeTableRefreshes;
        };

        this.gridLock = function(){
            var deferred = $q.defer();

            var data = {
                operation: "gridLock",
                hash: storeHash
            };

            $http.post(optionUrl, data)
                .success(function(data){
                    deferred.resolve(data);
                });
            return deferred.promise;
        };

        this.updateGridRefreshes = function(val){
            var deferred = $q.defer();

            console.log(storeHash);
            var data = {
                operation: "updateGridRefreshes",
                hash: storeHash,
                refresh: val
            };
            console.log(storeHash);console.log(val);
            $http.post(optionUrl, data)
                .success(function(data){
                    deferred.resolve(data);
                });
            return deferred.promise;
        }

        this.saveGrid = function(grid){
            var deferred = $q.defer();

            var data = {
                operation: "saveGrid",
                hash: storeHash,
                grid: angular.fromJson(grid)
            };

            $http.post(optionUrl, data)
                .success(function(data){
                    deferred.resolve(data);
                });
            return deferred.promise;
        };

        this.createNewAccount = function(username, hash){
            var deferred = $q.defer();

            var data = {
                operation: "addNewUser",
                user: username,
                hash: hash
            };

            $http.post(optionUrl, data)
                .success(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        };

        this.login = function(username, hash){
            var deferred = $q.defer();

            var data = {
                operation: "login",
                user: username,
                hash: hash
            };

            $http.post(optionUrl, data)
                .success(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        };

        this.buildNewBoard = function() {

            var squareOptions = angular.copy(squareSource);

            var newGrid = [];

            var randomValue = Math.floor((Math.random() * squareOptions.length));

            for (var i = 0; i < 24; i++) {
                newGrid.push({key:squareOptions[randomValue], pic:null});
                squareOptions.splice(randomValue, 1);
                randomValue = Math.floor((Math.random() * squareOptions.length));
            }

            //splice in the free center spot
            newGrid.splice(12, 0, {key:"SELFIE", pic:null});
            return newGrid;
        };
    }]);
