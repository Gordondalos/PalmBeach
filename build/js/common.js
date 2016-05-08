/* Главный модуль*/
// Конфигурация главного модуля
var main = angular.module('main', ['ngRoute','navigation','userInfo','record']);
main.config(['$routeProvider', function($routeProvide){

    $routeProvide
        .when ('/',{
        templateUrl:'view/home.html',
        //controller: 'homeCtrl'
    })
        .when ('/record',{
        templateUrl:'view/record.html',
        controller: 'recordCtrl'
    })
    //    .when ('/two',{
    //    templateUrl:'view/two.html',
    //    controller: 'twoCtrl'
    //})
    //    .when ('/three',{
    //    templateUrl:'view/three.html',
    //    controller: 'threeCtrl'
    //})
        .otherwise({
            redirectTo: '/'
        });
}]);

/*Модуль Навигации*/
var navigation = angular.module('navigation', [ ]);
/* Директивы модуля навигаций*/
navigation.directive('viewNavigation', function(){
   return{
       restrict: 'E',
       templateUrl: 'view/viewNavigation.html',
       replace: true,
   }
});


/*Модуль Записей*/
var record = angular.module('record', [ ]);
record.controller('recordCtrl',['$scope',function(){

}]);
/* Директивы модуля Записей*/
record.directive('viewRecord', function(){
    return{
        restrict: 'E',
        templateUrl: 'view/viewRecord.html',
        replace: true,
    }
});



/*Модуль Управления пользователями*/
var userInfo = angular.module('userInfo', [ ]);
/* Директивы модуля навигаций*/
userInfo.directive('viewUserInfo', function(){
   return{
       restrict: 'E',
       templateUrl: 'view/viewUserInfo.html',
       replace: true,
   }
});