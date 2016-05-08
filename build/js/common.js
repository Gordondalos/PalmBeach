/* Главный модуль*/
// Конфигурация главного модуля
var main = angular.module('main', [
    'ngRoute',
    'navigation',
    'userInfo',
    'record',
    'dndLists',
]);
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
record.controller('recordCtrl', ['$scope', function ($scope) {

    // Удаление элемента
    $scope.del = function (items, index) {
        items.splice(index, 1);
    };

  // форма для ввода цвета
    $scope.displayForm = false;
    $scope.selectedItem = {};

    $scope.closeForm = function () {
        $scope.displayForm = false;
        $scope.selectedItem.color = $scope.color;
        $scope.color = "";
        $scope.selectedItem = {};
    }

    $scope.showModal = function () {
        $scope.displayForm = true;
        $scope.selectedItem = this.item;
    };

    // Взять и бросить
    $scope.models = [
        {listName: "A", items: [], dragging: false},
        {listName: "B", items: [], dragging: false}
    ];

    /**
     * dnd-dragging determines what data gets serialized and send to the receiver
     * of the drop. While we usually just send a single object, we send the array
     * of all selected items here.
     */
    $scope.getSelectedItemsIncluding = function (list, item) {
        item.selected = true;
        return list.items.filter(function (item) {
            return item.selected;
        });
    };

    /**
     * We set the list into dragging state, meaning the items that are being
     * dragged are hidden. We also use the HTML5 API directly to set a custom
     * image, since otherwise only the one item that the user actually dragged
     * would be shown as drag image.
     */
    $scope.onDragstart = function (list, event) {
        list.dragging = true;
        if (event.dataTransfer.setDragImage) {
            var img = new Image();
            img.src = 'framework/vendor/ic_content_copy_black_24dp_2x.png';
            event.dataTransfer.setDragImage(img, 0, 0);
        }
    };

    /**
     * In the dnd-drop callback, we now have to handle the data array that we
     * sent above. We handle the insertion into the list ourselves. By returning
     * true, the dnd-list directive won't do the insertion itself.
     */
    $scope.onDrop = function (list, items, index) {
        angular.forEach(items, function (item) {
            item.selected = false;
        });
        list.items = list.items.slice(0, index)
            .concat(items)
            .concat(list.items.slice(index));
        return true;
    }

    /**
     * Last but not least, we have to remove the previously dragged items in the
     * dnd-moved callback.
     */
    $scope.onMoved = function (list) {
        list.items = list.items.filter(function (item) {
            return !item.selected;
        });
    };

    // Generate the initial model
    angular.forEach($scope.models, function (list) {
        for (var i = 1; i <= 4; ++i) {
            list.items.push({label: "Item " + list.listName + i, color: '#fff'});
        }
    });

    // Model to JSON for demo purpose
    $scope.$watch('models', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);


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