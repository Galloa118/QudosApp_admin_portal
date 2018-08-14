(function () {
    'use strict';

    angular.module('BlurAdmin.pages.drivers.schedule', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('drivers.schedule', {
                url: '/scheduleDriver',
                templateUrl:'app/pages/drivers/schedule/schedule.html',
                controller: 'scheduleCtrl',
                title: 'Schedule Rides'
                
      });
    }
})();

