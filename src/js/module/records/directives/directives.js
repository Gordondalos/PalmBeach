/* Директивы модуля Записей*/
record.directive('viewRecord', function(){
    return{
        restrict: 'E',
        templateUrl: 'view/viewRecord.html',
        replace: true,
    }
});