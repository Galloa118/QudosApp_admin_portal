/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.drivers.driverDetails', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('drivers.driverDetails', {
          url: '/driversDetails',
          templateUrl: 'app/pages/drivers/approved/driverDetails.html',
          title: 'Driver Details',
          controller: 'driversDetailCtrl'
        })
  }

})();
