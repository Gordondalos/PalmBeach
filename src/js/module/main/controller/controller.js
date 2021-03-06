/*Главный контроллер*/
main.controller('mainCtrl', ['$scope', function ($scope){
    $scope.vm.calendarTitle="Мой заголовок";
    $scope.vm.viewDate= new Date();
    $scope.vm.calendarView= 'month';
    $scope.vm.master= 'Мастер';

    // Добавление одного часа к текущей дате
    var today = new Date;
    $scope.vm.endsDate = today.setHours(today.getHours()+1);

    $scope.hideblock = false;

    $scope.events = [
        {
            title: 'ФИО', // The title of the event
            type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
            startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
            endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
            editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
            deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
            draggable: true, //Allow an event to be dragged and dropped
            resizable: true, //Allow an event to be resizable
            incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
            recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
            cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
        }
    ];
}]);