/* Copyrights-Developed by Qudos USA LLC */
(function() {
  "use strict";

  angular
    .module("BlurAdmin.pages.reportdetails.paymentpayoutreport")
    .controller("paymentpayoutreportCtrl", paymentpayoutreportCtrl);

  function paymentpayoutreportCtrl(
    $timeout,
    $scope,
    $http,
    MY_CONSTANT,
    ngDialog,
    $state,
    $filter,
    $rootScope,
    $mdSidenav,
    $log
  ) {
    var bookmark;
    $scope.selected = [];
    $scope.limitOptions = [10, 15, 30];
    $scope.isLoading = false;

    $scope.options = {
      rowSelection: false,
      multiSelect: false,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: true,
      boundaryLinks: true,
      limitSelect: true,
      pageSelect: false
    };

    $scope.query = {
      filter: "",
      order: "session_id",
      limit: 10,
      page: 1
    };

    $scope.filter = {
      options: {
        debounce: 500
      }
    };

    $scope.removeFilter = function() {
      $scope.filter.show = false;
      $scope.query.filter = "";
      //console.log("removed filter");
    };

    $scope.$watch("query.filter", function(newValue, oldValue) {
      if (!oldValue) {
        bookmark = $scope.query.page;
      }

      if (newValue !== oldValue) {
        $scope.query.page = 1;
      }

      if (!newValue) {
        $scope.query.page = bookmark;
      }

      $scope.getPage();
    });

    $scope.data = [];
    $scope.totalItems = 0;
    $scope.totalPayment = 0;
    $scope.viewby = 10;
    $scope.totalItems = 0; //$scope.data.length; //
    $scope.currentPage = 1; //
    $scope.itemsPerPage = $scope.viewby; //
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.getPage = function() {
      $scope.isLoading = true;
      var skip = ($scope.currentPage - 1) * $scope.viewby;

      $http
        .post(MY_CONSTANT.url + "/admin/payment_payout", {
          access_token: localStorage.getItem("access_token"),
          limit: $scope.viewby,
          offset:0,
          sort_by: "session_id",
          sort_order: "DESC",
          // car_type:1
          // searchFlag: 0,
          // searchString: "",
        })
        .success(function(data, status) {
          $scope.isLoading = false;
          $scope.data = data.payments;
          console.log("TANU",$scope.data);
         $scope.totalItems = data.total_count;
        })
        .error(function(data, status) {});
    };

    $scope.getPage();

    $scope.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      // console.log('Page changed to: ' + $scope.currentPage);
      $scope.getPage();
    };

    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    };

    $scope.back = function() {
      $state.go("reports");
    };

    function downloadCSV(csv, filename) {
      var csvFile;
      var downloadLink;

      // CSV file
      csvFile = new Blob([csv], { type: "text/csv" });

      // Download link
      downloadLink = document.createElement("a");

      // File name
      downloadLink.download = filename;

      // Create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);

      // Hide download link
      downloadLink.style.display = "none";

      // Add the link to DOM
      document.body.appendChild(downloadLink);

      // Click download link
      downloadLink.click();
    }

    $scope.exportTableToCSV = function(filename, selector) {
      var csv = [];
      var rows = document.querySelectorAll(selector);

      for (var i = 0; i < rows.length; i++) {
        var row = [],
          cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

        csv.push(row.join(","));
      }

      // Download CSV file
      downloadCSV(csv.join("\n"), filename);
    };
  }
})();
