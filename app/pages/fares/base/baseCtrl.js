/* Copyrights-Developed by Qudos USA LLC */
(function() {
  "use strict";

  angular
    .module("BlurAdmin.pages.fares.base")
    .controller("baseFaresCtrl", baseFaresCtrl);
  function baseFaresCtrl(
    $timeout,
    $scope,
    $http,
    MY_CONSTANT,
    ngDialog,
    $state,
    $filter
  ) {
    $scope.carTypes = [{name:'QS (4 max)',type:1},
            {name:'QLE (6 max)',type:2},
            {name:'LUXE (VIP 4 max)',type:3},
            {name:'Grande (SUV)',type:4}]

    $scope.getRegions = function() {
      console.log("12300");
      $.post(
        MY_CONSTANT.url + "/get_regional_details",
        {
          access_token: localStorage.getItem("access_token"),
          region_id:1
        },
        function(data) {
            console.log("000000",data);
          var regionArray = [];
          regionArray.push({
            region_id: 0,
            region_name: "Default"
          });
          var dataArray = [];
          var excelArray = [];
          if (typeof data == "string") {
            data = JSON.parse(data);
          }

          if (data.status == 401) {
            $state.go("page.login");
          } else if (data.status == 200) {
            console.log("region wala",data);
            var areaList = data.regions;
            areaList.forEach(function(column) {
              var d = {};
              d.region_id = column.region_id;
              d.region_name = column.region_name;
              regionArray.push(d);
            });
            //on success applying list aal cars api for pre select

            //$scope.$apply(function () {
            $scope.regionlist = regionArray;
            console.log($scope.regionlist);

            $scope.region_id = 0;

            // $http
            //   .post(MY_CONSTANT.url + "/get_regional_fare_details", {
            //     access_token: localStorage.getItem("access_token")
            //   })
              // .success(function(data) {
              //   ////data = JSON.parse(data);
              //   if (data.status == 200) {
              //     console.log("1111111111111111111",data);
              //     //$scope.$apply(function () {
              //     $scope.select_car = data.data.car_list[0].car_type;
              //     $scope.set(0);
              //     scrollTo(0, 0);
              //     //});
              //   }
              // });
            //});
          }
        }
      );
    };
    $scope.getRegions();

    //======getting list of cars =====//
    // $http
    //   .post(MY_CONSTANT.url + "/get_regional_fare_details", {
    //     access_token: localStorage.getItem("access_token"),
    //     car_type: 1,
    //     region_id: 1
        
    //   })
    //   .success(function(data) {
    //     console.log("2222222222222222222222",data.status);
       
    //     //data = JSON.parse(data);
    //     if (data) {
    //       console.log("hhhhhhhhhh",data);
    //       $scope.car_type = data.regional_fare[0].car_type;
    //       $scope.car_name = data.regional_fare[0].car_name;
    //       $scope.car_id = data.regional_fare[0].car_id;
    //       $scope.fare_fixed = data.regional_fare[0].fare_fixed;
    //       $scope.fare_per_km = data.regional_fare[0].fare_per_km;
    //       $scope.fare_per_min = data.regional_fare[0].fare_per_min;
    //       $scope.fare_threshold_distance = data.regional_fare[0].fare_threshold_distance;
    //       $scope.fare_threshold_time = data.regional_fare[0].fare_threshold_time;
    //       $scope.wait_time_fare_per_min = data.regional_fare[0].wait_time_fare_per_min;
    //       $scope.car_seats = data.regional_fare[0].car_seats;
    //       $scope.cancellation_time = data.regional_fare[0].cancellation_time;
    //       $scope.cancellation_fee = data.regional_fare[0].cancellation_fee;
           
          
          // $scope.list = dataArray;
          //$scope.$apply(function () {
          //    $scope.list = dataArray;
          //});
      //   }
      // });
      
      $http
        .post(MY_CONSTANT.url + "/get_regional_fare_details", {
          access_token: localStorage.getItem("access_token"),
          car_type: 1,
          region_id: 1
         
        })
        .success(function(data) {
          //data = JSON.parse(data);

          if (data) {
            console.log("22222222222222222",data);
            var length = data.regional_fare.length;
            console.log("length",length)
            for (var i = 0; i < length; i++) {
              console.log("mmmm",data.regional_fare[0].car_type);
              // if ($scope.select_car == data.regional_fare[i].car_type) {
                // $scope.$apply(function () {

                console.log("dffdgd",data.regional_fare[0].car_type);
                $scope.cars = {
                  fare_per_min: data.regional_fare[i].fare_per_min,
                  fare_per_km: data.regional_fare[i].fare_per_km,
                  fare_fixed: data.regional_fare[i].fare_fixed,
                  fare_threshold_distance:
                    data.regional_fare[i].fare_threshold_distance,
                  fare_threshold_time:
                    data.regional_fare[i].fare_threshold_time,
                  wait_time_fare_per_min:
                    data.regional_fare[i].wait_time_fare_per_min,
                  car_seats: data.regional_fare[i].car_seats,
                  cancellation_time: data.regional_fare[i].cancellation_time,
                  cancellation_fee: data.regional_fare[i].cancellation_fee
                };
                //});
              // }
            }
          }
          $scope.getRegions();
        });

    /*--------------------------------------------------------------------------
         *----------------- funtion when car type change ---------------------------
         --------------------------------------------------------------------------*/
    $scope.set = function(flag, a) {
      console.log("chalaaaaaaaaaaaaaaaaaa",$scope.region_id);
      console.log("kjk",$scope.select_car);
      console.log(a);
      if (a != undefined) $scope.select_car = a;
      /*if(angular.isUndefined($scope.region_id)){
                $scope.errorMsg = "Select Region";
                setTimeout(function () {
                    $scope.errorMsg = "";
                    //$scope.$apply();
                }, 3000);
                return false;
            }
            if(angular.isUndefined($scope.select_car)){
                $scope.errorMsg = "Select Car Type";
                setTimeout(function () {
                    $scope.errorMsg = "";
                    //$scope.$apply();
                }, 3000);
                return false;
            }*/

      $http
        .post(MY_CONSTANT.url + "/get_regional_fare_details", {
          access_token: localStorage.getItem("access_token"),
          car_type: 1,
          region_id: 1
         
        })
        .success(function(data) {
          //data = JSON.parse(data);

          if (data.status == 200) {
            console.log("33333333333333333333",data);
            var length = data.data.car_list.length;
            for (var i = 0; i < length; i++) {
              console.log($scope.select_car);
              if ($scope.select_car == data.data.car_list[i].car_type) {
                // $scope.$apply(function () {

                console.log(data.data.car_list[i].car_type);
                $scope.cars = {
                  fare_per_min: data.data.car_list[i].fare_per_min,
                  fare_per_km: data.data.car_list[i].fare_per_km,
                  fare_fixed: data.data.car_list[i].fare_fixed,
                  fare_threshold_distance:
                    data.data.car_list[i].fare_threshold_distance,
                  fare_threshold_time:
                    data.data.car_list[i].fare_threshold_time,
                  wait_time_fare_per_min:
                    data.data.car_list[i].wait_time_fare_per_min,
                  car_seats: data.data.car_list[i].car_seats,
                  cancellation_time: data.data.car_list[i].cancellation_time,
                  cancellation_fee: data.data.car_list[i].cancellation_fee
                };
                //});
              }
            }
          }
        });
    };

    $scope.car = {};

    /*--------------------------------------------------------------------------
         * ---------------- funtion for update car fare ----------------------------
         --------------------------------------------------------------------------*/
    $scope.addCarFare = function(cars) {
      console.log("kkkkkkkkkkkkkkkkkk",cars);
      console.log(cars);
      $scope.successMsg = "";
      $scope.errorMsg = "";
      $scope.car.access_token = localStorage.getItem("access_token");
      $scope.car.car_id = $scope.select_car;
      $scope.car.fare_fixed = cars.fare_fixed;
      $scope.car.fare_per_km = cars.fare_per_km;
      $scope.car.fare_per_min = cars.fare_per_min;
      $scope.car.wait_time_fare_per_min = cars.wait_time_fare_per_min;
      $scope.car.fare_threshold_time = cars.fare_threshold_time;
      $scope.car.fare_threshold_distance = cars.fare_threshold_distance;
      $scope.car.car_seats = cars.car_seats;
      $scope.car.cancellation_time = cars.cancellation_time;
      $scope.car.cancellation_fee = cars.cancellation_fee;
      $scope.car.region_id = $scope.region_id;

      //if($scope.car.car_id == '' || $scope.car.car_id == undefined) {
      //    $scope.errorMsg = "Please select car type";
      //    setTimeout(function () {
      //        $scope.errorMsg  = "";
      //        $scope.$apply();
      //    }, 3000);
      //}
      //else{
      $http
        .post(MY_CONSTANT.url + "/update_regional_fare", $scope.car)
        .then(function(data) {
          //data = JSON.parse(data);

          if (data.status == 200) {
            $scope.successMsg = data.data.message;

            // alert("Car fare updated successfully");
            //$scope.$apply();
            setTimeout(function() {
              console.log("a");
              $scope.successMsg = "";
              $scope.$apply();
            }, 3000);
          } else {
            $scope.errorMsg = data.data.message;
            //$scope.$apply();
            setTimeout(function() {
              $scope.errorMsg = "";
              $scope.$apply();
            }, 3000);
          }
          scrollTo(0, 0);
        });
      // }
    };
  }
})();