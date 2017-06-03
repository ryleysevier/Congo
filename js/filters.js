/* Filters */

angular.module('Congo.filters', []).
    filter('noSwitchers', function() {
        return function(equipmentList) {
            var newEquipment = [];

            angular.forEach(equipmentList, function(equipment){
               if(equipment.type != 'r' &&
                   equipment.type != 'a' &&
                   equipment.type != 'v')
               {
                   newEquipment.push(equipment);
               }
            });

            return newEquipment;
    }
  }).filter('onlySwitchers', function() {
        return function(equipmentList) {
            var newEquipment = [];

            angular.forEach(equipmentList, function(equipment){
                if(equipment.category == 'a' || equipment.category == 'r' || equipment.category == 'v')
                {
                    newEquipment.push(equipment);
                }
            });

            return newEquipment;
        }
    }).filter('noDisplays', function() {
        return function(equipmentList) {
            var newEquipment = [];

            angular.forEach(equipmentList, function(equipment){
                if(equipment.type != 'd')
                {
                    newEquipment.push(equipment);
                }
            });

            return newEquipment;
        }
    }).filter('trim30', function() {
        return function(toTrim) {

            if(toTrim.length > 30){
                toTrim = angular.substring(0, 30);
            }


            return toTrim;
        }
    }).filter('reverse', function(){
        return function(array) {
            return array.slice().reverse();
        }
    });
