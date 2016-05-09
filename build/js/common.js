/* Главный модуль*/
// Конфигурация главного модуля
var main = angular.module('main', [
    'ngRoute',
    'navigation',
    'userInfo',
    'record',
    'dndLists',
    'ui.bootstrap.datetimepicker',
    'mwl.calendar'


]);

main.config(function(calendarConfig) {

    console.log(calendarConfig); //view all available config

   // calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; //change the month view template to a custom template
    calendarConfig.templates.calendarMonthView = 'view/calendarMonthView.html'; //change the month view template to a custom template

    calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour

    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter

    calendarConfig.i18nStrings.weekNumber = 'Week {week}'; //This will set the week number hover label on the month view

    calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.

    calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.

    calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.
});
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
/*Главный контроллер*/
main.controller('mainCtrl', ['$scope', function ($scope){
    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();

    $scope.events = [
        {
            title: 'My event title', // The title of the event
            type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
            startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
            endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
            editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
            deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
            draggable: true, //Allow an event to be dragged and dropped
            resizable: true, //Allow an event to be resizable
            incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
            recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
            cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
        }
    ];
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

    $scope.plus = function(items){
        items.push(items.length+1);
    };

  // форма для ввода цвета
    $scope.displayForm = false;
    $scope.selectedItem = {};

    $scope.closeForm = function () {
        $scope.displayForm = false;
        $scope.selectedItem.color = $scope.color;
        $scope.selectedItem.name = $scope.name;
        $scope.selectedItem.description = $scope.description;
        $scope.selectedItem.dateTime = $scope.dateTime;


        $scope.color = "";
        $scope.name = "";
        $scope.dateTime = "";
        $scope.description = "";
        $scope.selectedItem = {};
    }

    $scope.showModal = function () {
        $scope.displayForm = true;
        $scope.selectedItem = this.item;
        $scope.name = this.item.name;
        $scope.description = this.item.description;
        $scope.dateTime = this.item.dateTime;
    };

    // Взять и бросить
    $scope.models = [
        {listName: "Оля", items: [], dragging: false},
        {listName: "Таня", items: [], dragging: false},
        {listName: "Валя", items: [], dragging: false},
        {listName: "Катя", items: [], dragging: false}
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
            img.src = 'img/ic_content_copy_black_24dp_2x.png';
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
        for (var i = 1; i <= 3; ++i) {
           // list.items.push({label: "Свободно " + list.listName + i, color: '#fff'});
            list.items.push({
                name: "",
                description: "",
                dateTime: "",

            });
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