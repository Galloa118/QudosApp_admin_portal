/* Copyrights-Developed by Qudos USA LLC */
(function() {
    "use strict";
  
    angular
      .module('BlurAdmin.pages.log')
      .controller('logCtrl', logCtrl);
  
    function logCtrl(
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
            console.log("origne-----", data);
            $scope.data = data.payments;
            $scope.scheduledata = data.schduledData;
            $scope.totalItems = data.total_count; 
            var alltotalPayment = 0;
            var allscheduletotalPayment = 0;
            var allqudosfee = 0;
            var allscheduledqudosfee = 0;
            var alltax = 0;
            var allscheduledtax = 0;
            for(let totalPayment of data.payments) {
                alltotalPayment = alltotalPayment + totalPayment.total_payment;
                allqudosfee = allqudosfee + totalPayment.qudos_fee;
                alltax = alltax + totalPayment.sales_tax;
            }
            for(let scheduletotalPayment of data.schduledData) {
                allscheduletotalPayment = allscheduletotalPayment + scheduletotalPayment.total_payment;
                allscheduledqudosfee = allscheduledqudosfee + scheduletotalPayment.qudos_fee;
                allscheduledtax = allscheduledtax + scheduletotalPayment.sales_tax;
            }
            $scope.totalPayment = alltotalPayment;
            $scope.scheduletotalPayment = allscheduletotalPayment;
            $scope.totalqudosfee = allqudosfee + allscheduledqudosfee;
            $scope.totaltax = alltax + allscheduledtax;
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

      $scope.tab_click1 = function() {
          $scope.completedtab = true;
          $scope.scheduledtab = false;
      };
      $scope.tab_click2 = function() {
        $scope.scheduledtab = true;
        $scope.completedtab = false;
      };
    }
  })();
  
// (function () {
//     'use strict';
 
//     angular.module('BlurAdmin.pages.log')
//         .controller('logCtrl', logCtrl);
//     function logCtrl($timeout,$rootScope,$scope,$http,MY_CONSTANT,ngDialog,$state,$filter) {
//       $rootScope.showloader=true;
//       $scope.currentPage = 1;
//       $scope.itemsPerPage = 10;
//       $scope.maxSize=5;
//       $scope.skip = 0;
//       var dtInstance;
//       $rootScope.auth =true;
//       $scope.selected = [];
//       $scope.limitOptions = [10, 25, 35];
//               $scope.options = {
//                   rowSelection: false,
//                   multiSelect: false,
//                   autoSelect: true,
//                   decapitate: false,
//                   largeEditDialog: true,
//                   boundaryLinks: true,
//                   limitSelect: true,
//                   pageSelect: false
//               };
      
//               $scope.query = {
//                   filter: '',
//                   order: 'investor_name',
//                   limit: 10,
//                   page: 1,
//                   requestType: 0
//               };
      
//       $scope.pageChanged = function (currentPage) {
//           $scope.currentPage = currentPage;
//           console.log('Page changed to: ' + $scope.currentPage);
//           for(var i=1;i<=$scope.totalItems/10+1;i++) {
//               if ($scope.currentPage == i) {
//                   $scope.skip = 10*(i-1);
//                   console.log('Offset changed to: ' + $scope.skip);
//                   //$scope.$apply();
//               }
//           }
//           dtInstance.fnDestroy();
//           $scope.investors();
//       };
//       $scope.removeFilter = function () {
//         $scope.filter.show = false;
//         $scope.query.filter = '';
//         console.log("removed filter");
//         console.log( $scope.filter.show);

// /*            if($scope.filter.form.$dirty) {
//             $scope.filter.form.$setPristine();
//         }*/
//     };
//       $scope.investors = function(){
//         $scope.isLoading = true;
//         $scope.skip= ($scope.query.page-1)*$scope.query.limit;

//         $http({
//             method: 'POST',
//             url: MY_CONSTANT.url + '/admin/audit_logs',
//             headers: {'Content-Type':'application/json;charset=utf-8'},
//            data:{
//             access_token: localStorage.getItem('access_token'),
//             limit:$scope.query.limit,
//             offset:$scope.skip,
//             searchFlag: $scope.query.filter? 1 : 0,
//             searchString:$scope.query.filter,
//             sort_by:'created_at',
//             sort_order:'DESC',
          
//            }
//         })
        
//         // $.post(MY_CONSTANT.url + '/investors_list', {
//         //     access_token: localStorage.getItem('access_token'),
//         //     limit:$scope.query.limit,
//         //     offset:$scope.skip,
//         //     })
//             .success(function (data,count) {
//               $scope.isLoading = false;
//               console.log(data);
//               $scope.audit_logs=data.audit_logs;
//               $scope.totalItems=count;
//               $rootScope.showloader=false;
//             //   $scope.$apply(function()
//             //   {
//               // var dtInstance;
//               $timeout(function () {
//                 console.log("Asd");
//                   if (!$.fn.dataTable) return;
//                   dtInstance = $('#datatableInvestors').dataTable({
//                       'paging': true,  // Table pagination
//                       'ordering': true,  // Column ordering
//                       'info': true,
//                       'bDestroy':true,
//                       // Text translation options
//                       // Note the required keywords between underscores (e.g _MENU_)
//                       oLanguage: {
//                           sSearch: 'Search all columns:',
//                           sLengthMenu: '_MENU_ records per page',
//                           info: 'Showing page _PAGE_ of _PAGES_',
//                           zeroRecords: 'Nothing found - sorry',
//                           infoEmpty: 'No records available',
//                           infoFiltered: '(filtered from _MAX_ total records)'
//                       }
//                   });
//                   var inputSearchClass = 'datatable_input_col_search';
//                 });
//             //   });
//             })
//       }
//       $scope.investors();

//       $scope.investorData = {};
//       $scope.investorData.is_shareholder = 0;
//       $scope.addEditInvestorDialog = function (mode,data) {
//           $scope.mode=mode;
//           if(mode=='add'){
//             $scope.investorData={};
//             $scope.investorData.is_shareholder = 0;
//           }
//           else $scope.investorData=data;
//           ngDialog.open({
//               template: 'modalInvestor',
//               className: 'ngdialog-theme-default',
//               showClose: false,
//               scope: $scope,
//               preCloseCallback: function () {
//                   $scope.investorData={};
//                   return true;
//               }
//           });
//       };
//       $scope.closeThisDialog = function (){
//           ngDialog.close({
//               template: 'modalInvestor',
//               className: 'ngdialog-theme-default',
//               scope: $scope
//           });
//       }
//       $scope.submitData = function(data){
//         if($scope.mode=='add'){
//           $.post(MY_CONSTANT.url + '/create_investor',{
//             access_token: localStorage.getItem('access_token'),
//             investor_name:data.investor_name,
//             investor_email:data.investor_email,
//             login_left:data.login_left,
//             is_shareholder:data.is_shareholder,
//             password:data.password
//           })
//           .success(function(data, status) {
//             console.log(data.flag);
//             if (data.flag != 1702) {
//               // alert("No Such region");
//               ngDialog.close({
//                   template: 'modalInvestor',
//                   className: 'ngdialog-theme-default',
//                   scope: $scope
//               });
//               $rootScope.openToast('error','Some Error Occured','');
//               $state.reload();
//             }
//             if (data.flag == 1702) {
//               // alert('Fare Added Sucessfully');
//               ngDialog.close({
//                   template: 'modalInvestor',
//                   className: 'ngdialog-theme-default',
//                   scope: $scope
//               });
//               $rootScope.openToast('success','Template Added Sucessfully','');
//               $state.reload();
//             }
//           })
//         }
//         else if($scope.mode=='save'){
//           $.post(MY_CONSTANT.url + '/edit_investor',{
//             access_token: localStorage.getItem('access_token'),
//             investor_id:data.investor_id,
//             investor_name:data.investor_name,
//             investor_email:data.investor_email,
//             login_left:data.login_left,
//             is_shareholder:data.is_shareholder
//           })
//           .success(function(data, status) {
//             if(typeof data ==='string') var data=JSON.parse(data);
//             else var data=data;
//             console.log(data.flag);
//             $scope.mode='saved';
//             $state.go('emailTemplate');
//             if (data.flag != 1701) {
//               // alert("No Such region");
//               ngDialog.close({
//                   template: 'modalInvestor',
//                   className: 'ngdialog-theme-default',
//                   scope: $scope
//               });
//               $rootScope.openToast('error','Some Error Occured','');
//               $state.reload();
//             }
//             if (data.flag == 1701) {
//               // alert('Fare Added Sucessfully');
//               ngDialog.close({
//                   template: 'modalInvestor',
//                   className: 'ngdialog-theme-default',
//                   scope: $scope
//               });
//               $rootScope.openToast('success','Investor data edited sucessfully','');
//               $state.reload();
//             }
//           })
//         }
//       }

//     }
// })();
