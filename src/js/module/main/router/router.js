main.config(['$routeProvider', function($routeProvide){

    $routeProvide
        .when ('/',{
        templateUrl:'view/home.html',
        //controller: 'mainCtrl'
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