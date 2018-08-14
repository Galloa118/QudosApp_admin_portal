/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.drivers.driversDetails', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('drivers.driversDetails', {
          url: '/driversDetails',
          templateUrl: 'app/pages/drivers/approved/driversDetails.html',
          title: 'Driver Details',
          controller: 'driversDetailsCtrl'
        })
  }

})();
